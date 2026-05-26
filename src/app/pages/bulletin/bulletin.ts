import { AfterViewInit, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ScrollRevealService } from '../../services/scroll-reveal.service';

interface VideoCard {
  videoId: string;
  title: string;
  meta: string;
  desc: string;
  customThumb?: string;
}

@Component({
  selector: 'app-bulletin',
  imports: [RouterLink],
  templateUrl: './bulletin.html',
  styleUrl: './bulletin.scss',
})
export class Bulletin implements AfterViewInit {
  private reveal = inject(ScrollRevealService);
  private sanitizer = inject(DomSanitizer);

  playingId: string | null = null;
  playingUrl: SafeResourceUrl | null = null;

  featured: VideoCard = {
    videoId: 'NMzNm02pOfc',
    title: 'Thought Transmission & Ancestry — Part 2',
    meta: 'Bruja TheOracle · Featured',
    desc: 'Wrapping the two-parter. How to tell ancestral transmissions apart from interpersonal telepathy, why your desire becomes a signal, and how people who catch your "bait" mentally are the ones already aligned to your frequency — including the free will question.',
    customThumb: 'assets/images/bulletin/image3.png',
  };

  videos: VideoCard[] = [
    {
      videoId: '2hzrvKPJalA',
      title: 'Thought Transmission & Ancestry — Part 1',
      meta: 'Bruja TheOracle · Part 1',
      desc: 'The foundation. How to know which thoughts are yours, which are coming from your guides, and which are landing from other minds — plus the ascent of life force from the base of the spine upward as the prerequisite for mobilising synchronicity.',
      customThumb: 'assets/images/bulletin/image2.png',
    },
    {
      videoId: 'UVDucYgbxcE',
      title: 'What Aura Care Did For Me — Kela\'s Story',
      meta: 'Bruja TheOracle · Client Story',
      desc: 'After COVID grief, suicidal ideation, and exhausting every modality from regression to grounding, 90 days of breathwork cleared Kela\'s water memory. What shifted in her body, her work, and the way strangers received her.',
      customThumb: 'assets/images/bulletin/image.png',
    },
    {
      videoId: 'mkTemTeJFVc',
      title: 'Breaking Generational Patterns with Aura Work',
      meta: 'Bruja TheOracle · Inner Work',
      desc: 'Generational patterns travel through blood, not the rituals around it. How spinal breathing rewrites the body at the molecular level — and the bloodline-wide effects: marriages aligning, fibroids dissolving, money portals opening for mothers and aunts too.',
    },
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

  thumb(v: VideoCard): string {
    return v.customThumb || `https://i.ytimg.com/vi/${v.videoId}/maxresdefault.jpg`;
  }

  onThumbError(event: Event, v: VideoCard) {
    if (v.customThumb) return;
    const img = event.target as HTMLImageElement;
    if (!img.src.includes('hqdefault')) {
      img.src = `https://i.ytimg.com/vi/${v.videoId}/hqdefault.jpg`;
    }
  }

  playVideo(id: string, event: Event) {
    event.stopPropagation();
    this.playingId = id;
    this.playingUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`
    );
  }

  ngAfterViewInit() { setTimeout(() => this.reveal.init(), 100); }
}