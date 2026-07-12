import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollRevealService } from '../../services/scroll-reveal.service';
import { BOOKING_FORM_URL, DREAM_VAULT_FORM_URL, DROP } from '../../shared/booking-links';

@Component({
  selector: 'app-services',
  imports: [RouterLink, CommonModule],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services implements AfterViewInit {
  activeTab = 'readings';
  bookingFormUrl = BOOKING_FORM_URL;
  dreamVaultUrl = DREAM_VAULT_FORM_URL;
  drop = DROP;
  private reveal = inject(ScrollRevealService);

  chakras = [
    { num: '1', name: 'Isisekelo (Root)', desc: 'Foundation — physical soil and star grounding.' },
    { num: '2', name: 'Isithunzi (Sacral)', desc: 'Pool of creation — shadow and subconscious memory.' },
    { num: '3', name: 'Ixhiba (Solar Plexus)', desc: 'The family hearth — internal sun and passion.' },
    { num: '4', name: 'Isifuba (Heart)', desc: 'Frequency shield — the sacred drum of the tribe.' },
    { num: '5', name: 'Umlomo weZulu (Throat)', desc: 'Mouth of heaven — bridge to material manifestation.' },
    { num: '6', name: 'Iso Lesilo (Third Eye)', desc: 'Eye of the Leopard — primal intuition and raw knowing.' },
    { num: '7', name: 'Inhlonhlo (Crown)', desc: 'The Peak — gateway for star knowledge.' },
  ];

  pillars = [
    { num: 'I', title: 'Somatic Sovereignty', desc: 'Anchor your aura in the nervous system. Move from crown energy to a grounded biological firewall.' },
    { num: 'II', title: 'Energetic Hygiene', desc: 'Systematic removal of energetic debris — trauma and fatigue — for a magnetic, high-performance presence.' },
    { num: 'III', title: 'Precision Pattern Recognition', desc: 'Identify exact points of energetic leakage. Go beyond symbols to feeling the grid of the other person.' },
    { num: 'IV', title: 'Ancient & Progressive Integration', desc: 'Bridging ancestral bones with modern bio-energetic performance architecture.' },
  ];


  ngAfterViewInit() { setTimeout(() => this.reveal.init(), 100); }

  setTab(tab: string) {
    this.activeTab = tab;
    setTimeout(() => {
      this.reveal.init();
      this.scrollToActiveSection();
    }, 50);
  }

  private scrollToActiveSection() {
    const section = document.querySelector('.svc-section') as HTMLElement | null;
    const svcNav = document.querySelector('.svc-nav') as HTMLElement | null;
    if (!section || !svcNav) return;

    const mainNavH = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-h')
    ) || 80;

    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const targetY = sectionTop - mainNavH - svcNav.offsetHeight;

    window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
  }
}
