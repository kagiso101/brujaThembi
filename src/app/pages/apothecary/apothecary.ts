import { AfterViewInit, Component, inject } from '@angular/core';
import { ScrollRevealService } from '../../services/scroll-reveal.service';
import { AURA_CARE_ORDER_FORM_URL } from '../../shared/booking-links';

@Component({
  selector: 'app-apothecary',
  imports: [],
  templateUrl: './apothecary.html',
  styleUrl: './apothecary.scss',
})
export class Apothecary implements AfterViewInit {
  private reveal = inject(ScrollRevealService);
  orderFormUrl = AURA_CARE_ORDER_FORM_URL;
  activeTab = 'capsules';

  capsuleIngredients = [
    { glyph: '♀', name: 'Hibiscus', desc: 'For when you are always tired. Hibiscus is rich in iron and vitamin C, and it is what people here reach for when they are dragging, foggy and running on empty.' },
    { glyph: '☽', name: 'Brahmi', desc: 'For a busy head. Known in Ayurveda as the Herb of Grace — used in India for hundreds of years by people who need to think clearly and feel less wound up.' },
    { glyph: '♄', name: 'Castor Oil', desc: 'For clearing out. Long used to clean the body out and to settle the Root Chakra — the base that keeps you grounded and steady.' },
  ];

  herbs = [
    { latin: 'Scoparia dulcis', name: 'Orange Flower', desc: 'Traditionally used for period trouble and to take the edge off labour pain.' },
    { latin: 'Leonurus cardiaca', name: 'Motherwort', desc: 'A calming herb, long used to settle the heart and ease cramps. Do not use while pregnant.' },
    { latin: 'Glycyrrhiza Glabra', name: 'Liquorice Root', desc: 'A soothing root. Traditionally used to calm irritation and to ease the change of life.' },
    { latin: 'Jasminum officinalis', name: 'Jasmine', desc: 'Calming, and it smells beautiful. Traditionally used for aching muscles and to help you sleep.' },
    { latin: 'Althea officinalis', name: 'Marshmallow Root', desc: 'A softening herb, traditionally used on sore, irritated skin — boils, burns and itchy patches.' },
    { latin: 'Rosmarinus', name: 'Rosemary', desc: 'Warming and cleansing. Traditionally used in steaming to freshen up and get things moving.' },
  ];

  skincare = [
    { cat: 'Cleanse', name: 'Black Soap Shower Gel', desc: 'Plant-based body wash. Cleans the body and the aura both — washes off the dirt, and the worries and fears that came home with it.', price: 'R190' },
    { cat: 'Hydrate', name: 'Root Lotion', desc: 'A body lotion made with root plants. Feeds dry skin and works on the Root Chakra — the base that keeps you steady on your feet.', price: 'R145' },
    { cat: 'Rest', name: 'Aura Oil Sleep Serum', desc: 'An oil blend for before bed. Made to calm you down enough that you actually fall asleep.', price: 'R130' },
    { cat: 'Ritual', name: 'Aura Salt Mixes', desc: 'Salts for the bath and body, used in water rituals. For when you need to soak the week off you and start clean.', price: 'R380' },
  ];

  boxContents = [
    'Black Soap Shower Gel',
    'Root Lotion',
    'Capsules × 3 varieties (Hibiscus, Brahmi, Castor Oil)',
    'Aura Salt Mix',
    'Aura Oil Sleep Serum',
    'Steaming blend sold separately — not included',
  ];

  allPrices = [
    { name: 'Hibiscus / Brahmi / Castor Oil Capsules (30s)', price: 'R80' },
    { name: 'Hibiscus / Brahmi / Castor Oil Capsules (90s)', price: 'R180' },
    { name: 'Steaming Blend', price: 'R469' },
    { name: 'Black Soap Shower Gel', price: 'R190' },
    { name: 'Root Lotion', price: 'R145' },
    { name: 'Aura Oil Sleep Serum', price: 'R130' },
    { name: 'Aura Salt Mixes', price: 'R380' },
    { name: 'Aura Care Box (incl. courier)', price: 'R1,000' },
    { name: 'Courier (individual orders)', price: 'R150' },
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
    const prodNav = document.querySelector('.prod-nav') as HTMLElement | null;
    const section = document.querySelector('.prod-nav ~ section') as HTMLElement | null;
    if (!prodNav || !section) return;

    const mainNavH = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-h')
    ) || 80;

    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const targetY = sectionTop - mainNavH - prodNav.offsetHeight;

    window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
  }
}
