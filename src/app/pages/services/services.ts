import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollRevealService } from '../../services/scroll-reveal.service';
import { ASTRAL_GYM_SIGNUP_URL, BOOKING_FORM_URL, DREAM_VAULT_FORM_URL, DROP } from '../../shared/booking-links';

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
  astralGymUrl = ASTRAL_GYM_SIGNUP_URL;
  drop = DROP;

  alchemyStages = [
    { num: '1', name: 'Nigredo (The Lead)', desc: 'Facing the shadow, heavy imagery, and uncomfortable subconscious material surfacing in nightmares or complex dreams.' },
    { num: '2', name: 'Albedo (The Whiteness)', desc: 'Purifying ego defences, isolating core symbols, and identifying deeper psychological truths.' },
    { num: '3', name: 'Citrinitas (The Yellowness)', desc: 'The dawn of conscious insight and direct spiritual downloads breaking into your waking mind.' },
    { num: '4', name: 'Rubedo (The Gold)', desc: 'Grounding the insight into physical daily life — achieving energetic wholeness free from fear, dogma, and ancestral and karmic loops.' },
  ];

  gymIncludes = [
    { num: 'I', title: 'Monthly Live Astral Resets', desc: 'A recurring virtual gathering where we come together to clear energetic static, align the spinal channel, and reset the dream and astral body using targeted spinal breathing exercises.' },
    { num: 'II', title: 'The Practice Vault', desc: 'On-demand replays. Full access to replay links so you can practise and integrate the spinal breathing, nervous system resets, and dream-prep breathwork independently throughout the month.' },
    { num: 'III', title: 'Unlimited Monthly Dream Unpackings', desc: 'Direct, ongoing access to depth-psychology dream unpackings. Submit your dream logs anytime to receive symbolic literacy, somatic tracking guidance, and ancestral context specific to the lineal blueprint from both the maternal and paternal side.' },
    { num: 'IV', title: 'Continuous Integration', desc: 'Keep your dream-recall muscles sharp alongside practitioners who speak the same language as you do.' },
  ];
  private reveal = inject(ScrollRevealService);

  chakras = [
    { num: '1', name: 'Isisekelo (Root)', desc: 'Your steady foundation — rooted deep into the earth while connected to the sky above.' },
    { num: '2', name: 'Isithunzi (Sacral)', desc: 'The creative waters of your inner self and the quiet home of your shadow, where hidden feelings lie waiting to be seen.' },
    { num: '3', name: 'Ixhiba (Solar Plexus)', desc: 'Your inner hearth and personal sun — the home of your vitality, drive, and personal warmth.' },
    { num: '4', name: 'Isifuba (Heart)', desc: 'The sacred drum of your chest. Your heart serves as both a warm home and a gentle shield, holding your safe boundaries.' },
    { num: '5', name: 'Umlomo weZulu (Throat)', desc: 'The mouth of heaven — the space where speaking your internal truth turns into lived reality.' },
    { num: '6', name: 'Iso Lesilo (Third Eye)', desc: 'The Eye of the Leopard — your deep inner knowing and intuition that understands truth before words can explain it.' },
    { num: '7', name: 'Inhlonhlo (Crown)', desc: 'The peak at the top of your head — your open door to ancestral wisdom and celestial guidance.' },
  ];

  pillars = [
    { num: 'I', title: 'Standing on Your Own Body', desc: 'Learn to trust the physical and intuitive signals from your own body so you stop second-guessing your insights or relying on outside validation.' },
    { num: 'II', title: 'Clearing Your Inner Slate', desc: 'Learn practical ways to put down energy that isn\'t yours — other people\'s stress, heavy emotions, or environmental static — so you come to every reading grounded and clear.' },
    { num: 'III', title: 'Reading with Precision & Honesty', desc: 'Move beyond vague, generic interpretations. Learn how to pinpoint exact patterns, themes, and subconscious blocks so your readings offer real clarity.' },
    { num: 'IV', title: 'Ancestral Wisdom for Modern Life', desc: 'Apply ancestral knowledge systems and traditional symbolic principles to the real-world situations people face every day — relationships, work, family dynamics, and personal health.' },
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
