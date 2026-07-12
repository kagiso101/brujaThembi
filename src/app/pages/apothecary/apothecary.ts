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
    { glyph: '♀', name: 'Hibiscus', desc: 'The Iron Factor. Bridges the gap between air in your lungs and energy in your cells. Combats microcytic anaemia, brain fog, anxiety, and chronic fatigue. Powerhouse of non-heme iron and Vitamin C.' },
    { glyph: '☽', name: 'Brahmi', desc: 'The Herb of Grace — revered in Ayurveda for cognitive enhancement, mental clarity, and stress relief. Adaptogenic and nootropic. Reduces anxiety and protects brain cells from oxidative stress.' },
    { glyph: '♄', name: 'Castor Oil', desc: 'Purification and chakra healing. Cleanses the aura of negative energies. Balances the Root Chakra, stabilising emotions and grounding spiritual energies.' },
  ];

  herbs = [
    { latin: 'Scoparia dulcis', name: 'Orange Flower', desc: 'Balances the sacral centre. Releases hormones that regulate blood sugar. Used for menstrual disorders and reducing labour pain.' },
    { latin: 'Leonurus cardiaca', name: 'Motherwort', desc: 'Cardiotonic, sedative, antispasmodic. Soothes menstrual irregularities, eases uterus cramps. Not for use during pregnancy.' },
    { latin: 'Glycyrrhiza Glabra', name: 'Liquorice Root', desc: 'Anti-viral, anti-bacterial, antioxidant. Tested against HSV, Hepatitis B & C, H. Pylori. Eases menopause symptoms.' },
    { latin: 'Jasminum officinalis', name: 'Jasmine', desc: 'Calming antimicrobial. Eases muscle pain, improves sleep quality, reduces cortisol. Aphrodisiac that eases PMS and labour pains.' },
    { latin: 'Althea officinalis', name: 'Marshmallow Root', desc: 'Emollient for skin inflammation — helps with boils, burns, eczema, psoriasis. Soothes the urinary tract. Eases cystitis.' },
    { latin: 'Rosmarinus', name: 'Rosemary', desc: 'Antifungal — inhibits candida albicans. Circulation booster and uterine stimulant. Disinfects and reduces discharge in steaming.' },
  ];

  skincare = [
    { cat: 'Cleanse', name: 'Black Soap Shower Gel', desc: 'Plant-based — cleanses not only the body but the aura. Washes away harmful thoughts, insecurities, and fears alongside physical dirt.', price: 'R190' },
    { cat: 'Hydrate', name: 'Root Lotion', desc: 'Grounding body lotion anchored in root-based botanicals. Nourishes the skin while supporting the Root Chakra and physical stability.', price: 'R145' },
    { cat: 'Rest', name: 'Aura Oil Sleep Serum', desc: 'Sleep-inducing oil blend designed to calm the nervous system and prepare the body for deep, restorative rest.', price: 'R130' },
    { cat: 'Ritual', name: 'Aura Salt Mixes', desc: 'Ritual salts for bath and body. Used in water activation practices to clear the electromagnetic field and remove energetic residue.', price: 'R380' },
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
    { name: 'Medicinal Steaming Blend', price: 'R469' },
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
