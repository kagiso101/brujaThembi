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
    { num: '1', name: 'Isisekelo (Root)', desc: 'Your foundation — rooted in the soil under your feet and the stars above you. It is what keeps you steady.' },
    { num: '2', name: 'Isithunzi (Sacral)', desc: 'The pool where everything is made. Also where the shadow sits — what you have buried and would rather not look at.' },
    { num: '3', name: 'Ixhiba (Solar Plexus)', desc: 'The family hearth. Your own inner sun — drive, appetite and passion.' },
    { num: '4', name: 'Isifuba (Heart)', desc: 'The sacred drum of the tribe. Your chest is a shield too — it decides who you let close.' },
    { num: '5', name: 'Umlomo weZulu (Throat)', desc: 'The mouth of heaven. Where something you say out loud starts turning into something real.' },
    { num: '6', name: 'Iso Lesilo (Third Eye)', desc: 'The Eye of the Leopard. Knowing a thing before you can explain how you know it.' },
    { num: '7', name: 'Inhlonhlo (Crown)', desc: 'The Peak. The gateway at the top of your head where the knowledge of the stars comes in.' },
  ];

  pillars = [
    { num: 'I', title: 'Standing On Your Own', desc: 'Learn to read from your own body instead of second-guessing yourself or waiting for someone else to confirm it.' },
    { num: 'II', title: 'Clearing Your Own Slate', desc: 'How to put down what is not yours — other people\'s moods, old stress, yesterday\'s argument — so you come to a reading clean.' },
    { num: 'III', title: 'Reading Accurately', desc: 'Finding the exact place where things are going wrong, instead of giving vague answers that could apply to anybody.' },
    { num: 'IV', title: 'Old Ways, Today\'s Problems', desc: 'Putting the ancestral bones and what our grandparents knew to work on what people actually walk in with — money, work, family, health.' },
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
