import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { ScrollRevealService } from '../../services/scroll-reveal.service';
import {
  AURA_CARE_ORDER_FORM_URL,
  BOOKING_FORM_URL,
  DREAM_VAULT_FORM_URL,
  DREAMWORK_MATRIX_SIGNUP_URL,
  DROP,
  ECZEMA_CASE_STUDY_VIDEO_ID,
  PROGRAMME_BOOKLET_URL,
  QUANTUM_SIGNUP_URL,
} from '../../shared/booking-links';

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
  dreamworkMatrixUrl = DREAMWORK_MATRIX_SIGNUP_URL;
  quantumUrl = QUANTUM_SIGNUP_URL;
  orderFormUrl = AURA_CARE_ORDER_FORM_URL;
  caseStudyWatchUrl = `https://youtu.be/${ECZEMA_CASE_STUDY_VIDEO_ID}`;
  drop = DROP;
  bookletUrl = PROGRAMME_BOOKLET_URL;

  offers = [
    { num: '1', tab: 'breathwork', name: 'Dreamwork-Based Regulation Blueprint · Self-Paced', format: '8 weeks · on-demand video, workbook and tracking tools', bestFor: 'self-motivated individuals seeking depth with maximum schedule flexibility.', price: 'R5,094' },
    { num: '2', tab: 'breathwork', name: 'Full Immersion Facilitation + Cohort Integration', format: '8 weeks · weekly live gatherings and a private community container', bestFor: 'those who thrive inside a live, held container and value group learning.', price: 'R6,792' },
    { num: '3', tab: 'cartomancy', name: 'Divination & Dreamwork Container', format: '6 months · cartomancy, card-to-body mapping and dream unpacking, self-paced or live cohort', bestFor: 'those ready for a deep energetic recalibration through the cards.', price: 'R1,500 / month' },
    { num: '4', tab: 'astral', name: 'Dreamwork Matrix', format: '6 months · one live somatic reset a month plus ongoing dream log unpacking', bestFor: 'ongoing monthly support focused purely on dreamwork and down-regulation.', price: 'R500 / month' },
  ];

  alchemyStages = [
    { num: '1', name: 'Nigredo (The Lead)', desc: 'Facing the shadow, heavy imagery, and uncomfortable subconscious material surfacing in nightmares or complex dreams.' },
    { num: '2', name: 'Albedo (The Whiteness)', desc: 'Purifying ego defences, isolating core symbols, and identifying deeper psychological truths.' },
    { num: '3', name: 'Citrinitas (The Yellowness)', desc: 'The dawn of conscious insight and direct spiritual downloads breaking into your waking mind.' },
    { num: '4', name: 'Rubedo (The Gold)', desc: 'Grounding the insight into physical daily life — achieving energetic wholeness free from fear, dogma, and ancestral and karmic loops.' },
  ];

  gymIncludes = [
    { num: 'I', title: 'Monthly Live Somatic Reset Gathering', desc: 'One live virtual gathering a month focused on deep reset breathwork and somatic clearing: clearing energetic static, aligning the spinal channel, and resetting the dream and astral body.' },
    { num: 'II', title: 'Dedicated Dream Log Unpacking', desc: 'Ongoing analysis and personalised energetic clearing processes based on your dream data. Submit your dream logs to receive symbolic literacy, somatic tracking guidance, and ancestral context from both the maternal and paternal side.' },
  ];
  therapyPackages = [
    { name: '3 Months (12 Weeks)', calc: 'R600 × 12', total: 'R7,200' },
    { name: '6 Months (26 Weeks)', calc: 'R600 × 26', total: 'R15,600' },
    { name: '12 Months (52 Weeks)', calc: 'R600 × 52', total: 'R31,200' },
  ];

  private reveal = inject(ScrollRevealService);
  private sanitizer = inject(DomSanitizer);

  caseStudyEmbedUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    `https://www.youtube-nocookie.com/embed/${ECZEMA_CASE_STUDY_VIDEO_ID}?rel=0`
  );

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
