import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { DROP } from '../shared/booking-links';

type Params = Record<string, string | number | boolean>;

/**
 * GA4 lead tracking. Initialised exactly once at app root (see app.config.ts).
 *
 * - page_view per Angular route change (send_page_view is off in index.html)
 * - one delegated click listener for WhatsApp, Google Form, mailto and tel links
 * - drop_status user property so every event can be split by open / closed drop
 *
 * Every call is guarded: ad blockers remove gtag entirely and an unguarded call
 * would throw inside the click handler and break the WhatsApp link itself.
 * Parameters describe the interaction, never the person (POPIA / GA terms).
 */
@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private started = false;

  init() {
    if (this.started) return;
    this.started = true;

    this.set('user_properties', { drop_status: DROP.open ? 'open' : 'closed' });

    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((e) => this.pageView(e.urlAfterRedirects));

    document.addEventListener('click', this.onClick);
    this.destroyRef.onDestroy(() => document.removeEventListener('click', this.onClick));
  }

  event(name: string, params: Params = {}) {
    if (typeof gtag !== 'function') return;
    gtag('event', name, params);
  }

  /** Banking section on /contact scrolled into view: closest proxy to purchase intent. */
  observeBankingDetails(el: Element) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((x) => x.isIntersecting)) {
          this.event('banking_details_view');
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
  }

  private pageView(path: string) {
    // The router's TitleStrategy has already applied the route title by NavigationEnd.
    this.event('page_view', {
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
    });
  }

  private set(key: string, value: Params) {
    if (typeof gtag !== 'function') return;
    gtag('set', key, value);
  }

  private onClick = (e: MouseEvent) => {
    const a = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href]');
    if (!a) return;
    const href = a.getAttribute('href') ?? '';
    const location = a.dataset['gaLocation'] ?? 'unknown';

    if (/wa\.me|api\.whatsapp\.com/.test(href)) {
      this.event('whatsapp_click', { location, intent: a.dataset['gaIntent'] ?? 'general' });
    } else if (/docs\.google\.com\/forms|forms\.gle/.test(href)) {
      this.event('booking_form_open', { location, form_name: a.dataset['gaForm'] ?? 'unknown' });
    } else if (href.startsWith('mailto:')) {
      this.event('email_click', { location });
    } else if (href.startsWith('tel:')) {
      this.event('phone_click', { location });
    }
  };
}
