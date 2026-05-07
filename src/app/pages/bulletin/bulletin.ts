import { AfterViewInit, Component, inject } from '@angular/core';
import { ScrollRevealService } from '../../services/scroll-reveal.service';

@Component({
  selector: 'app-bulletin',
  imports: [],
  templateUrl: './bulletin.html',
  styleUrl: './bulletin.scss',
})
export class Bulletin implements AfterViewInit {
  private reveal = inject(ScrollRevealService);
  videos = [
    { img: 'assets/images/bulletin/vid-auric.jpg', title: '14 Signs You\'re Losing Auric Light', meta: 'Aura Health · Latest', duration: 'YouTube', desc: 'Chronic fatigue, brain fog, and social withdrawal — learn the 14 warning signs and what to do about each.' },
    { img: 'assets/images/bulletin/vid-breath.jpg', title: 'April Grid-Reset Breathwork Session', meta: 'Breathwork · April 2026', duration: 'Session', desc: 'Full live session recording from the monthly group reset. Follow along or reference before booking.' },
    { img: 'assets/images/bulletin/vid-class.jpg', title: 'Breathwork Class — Group 4 Now Open', meta: 'Breathwork · Enrollment Open', duration: 'Programme', desc: 'Alternative holistic care that meets you in the comfort of your own home. Group 4 opens April 2026.' },
    { img: 'assets/images/bulletin/vid-carto.jpg', title: 'Intuitive Card Reading — The 6 Month Journey', meta: 'Cartomancy · Enrolment May 4–16', duration: 'Programme', desc: 'An introduction to the Spinal Cartomancy professional container — 24 classes across 6 months.' },
  ];

  articles = [
    { img: 'assets/images/bulletin/art-case.jpg', title: 'Breathwork Case Study: Somatic Release', meta: 'Breathwork · Case Study', tag: 'green', tagLabel: 'Somatic Science', desc: 'How a 6-week breathing programme shifted a client from chronic stagnation to regulated nervous system and measurable physical healing.' },
    { img: 'assets/images/bulletin/art-journal.jpg', title: 'The Journal Collection: Spinal Prana Freeform', meta: 'Cartomancy · Practice Tools', tag: 'pink', tagLabel: 'Practice', desc: 'A physical tool for cartomancy students and clients to track readings, breathwork sessions, and the slow unfolding of transformation.' },
    { img: 'assets/images/bulletin/art-clients.jpg', title: 'What Our Clients Say: A Year in Review', meta: 'Client Results · Social Proof', tag: 'peach', tagLabel: 'Results', desc: 'A collection of unsolicited client feedback — career breakthroughs, physical healing, and emotional transformation.' },
  ];

  waStories = [
    { img: 'assets/images/bulletin/wa-boom.jpg', tag: 'Career · Finance', title: 'First Day. New Job. R1,000 More.', quote: '"I can\'t believe I will be making my first trip out of the country. On my first day at the new job someone offered me R1,000 more than my current job and a side gig."', outcome: '↑ New income stream within 24 hours of manifestation' },
    { img: 'assets/images/bulletin/wa-chest.jpg', tag: 'Physical Healing', title: 'Chest Pain Down 70–75%', quote: '"After doing just the washing portals the pain in my chest area went down by precisely 70–75%. Felt like magic."', outcome: '↑ Measurable pain reduction after single session' },
    { img: 'assets/images/bulletin/wa-journey.jpg', tag: 'Spirituality', title: 'Remember in the Reading…', quote: '"My guides said they can no longer reach me spiritually. What I\'m feeling ama feelings abo being projected onto me. I must ignore it and keep going."', outcome: '↑ Client recognises energetic interference and holds ground' },
    { img: 'assets/images/bulletin/wa-dream.jpg', tag: 'Dreams · Guides', title: 'Guides in the Morning Choir', quote: '"I got woken up in the AM by a bird singing chirping — there\'s two of them that she loved and one other came — again frequently for your work."', outcome: '↑ Ongoing dream communication confirmed post-reading' },
  ];

  ngAfterViewInit() { setTimeout(() => this.reveal.init(), 100); }
  activeTab = 'tarot';
  setTab(t: string) { this.activeTab = t; }

}
