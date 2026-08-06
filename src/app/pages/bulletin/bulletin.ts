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
    desc: 'Part two. How to tell the difference between your ancestors talking to you and simply picking something up off another person — and why the people who react to what you want are usually the ones already on your wavelength. The free will question included.',
    customThumb: 'assets/images/bulletin/image3.png',
  };

  videos: VideoCard[] = [
    {
      videoId: '2hzrvKPJalA',
      title: 'Thought Transmission & Ancestry — Part 1',
      meta: 'Bruja TheOracle · Part 1',
      desc: 'Where to start. How to tell which thoughts are yours, which come from your ancestors, and which ones you have picked up off somebody else — plus why the work starts at the base of the spine and moves up from there.',
      customThumb: 'assets/images/bulletin/image2.png',
    },
    {
      videoId: 'UVDucYgbxcE',
      title: 'What Aura Care Did For Me — Kela\'s Story',
      meta: 'Bruja TheOracle · Client Story',
      desc: 'After losing someone to COVID, Kela had tried everything and was at her lowest. She gave the breathing work 90 days. She talks about what changed — in her body, in her work, and in the way people started treating her.',
      customThumb: 'assets/images/bulletin/image.png',
    },
    {
      videoId: 'mkTemTeJFVc',
      title: 'Breaking Family Patterns',
      meta: 'Bruja TheOracle · Inner Work',
      desc: 'The same things keep happening in your family and nobody can explain why. What the breathing work does about it, and why clients keep telling Bruja that their mothers and aunts start seeing changes too.',
    },
  ];

  articles = [
    { img: 'assets/images/bulletin/art-case.jpg', title: 'Six Weeks of Breathwork: One Client\'s Story', meta: 'Breathwork · Client Story', tag: 'green', tagLabel: 'Breathwork', desc: 'How she went from stuck and worn out to sleeping properly again — and what the six weeks actually looked like, week by week.' },
    { img: 'assets/images/bulletin/art-journal.jpg', title: 'The Journal Collection: Spinal Prana Freeform', meta: 'Cartomancy · Tools', tag: 'pink', tagLabel: 'Practice', desc: 'A notebook for students and clients to keep track of readings, breathing sessions, and the slow business of things actually changing.' },
    { img: 'assets/images/bulletin/art-clients.jpg', title: 'What Our Clients Say: A Year in Review', meta: 'Client Stories · A Year in Review', tag: 'peach', tagLabel: 'Results', desc: 'A year of messages clients sent in on their own — new jobs, health turnarounds, and weights finally lifted.' },
  ];

  waStories = [
    { img: 'assets/images/bulletin/wa-boom.jpg', tag: 'Work · Money', title: 'First Day. New Job. R1,000 More.', quote: '"I can\'t believe I will be making my first trip out of the country. On my first day at the new job someone offered me R1,000 more than my current job and a side gig."', outcome: '↑ Extra income within a day of the reading' },
    { img: 'assets/images/bulletin/wa-chest.jpg', tag: 'Body', title: 'Chest Pain Eased After One Session', quote: '"After doing just the washing portals the pain in my chest area went down by precisely 70–75%. Felt like magic."', outcome: '↑ She says the pain eased after a single session' },
    { img: 'assets/images/bulletin/wa-journey.jpg', tag: 'Ancestors', title: 'Remember in the Reading…', quote: '"My guides said they can no longer reach me spiritually. What I\'m feeling ama feelings abo being projected onto me. I must ignore it and keep going."', outcome: '↑ She spotted what was being put on her and held her ground' },
    { img: 'assets/images/bulletin/wa-dream.jpg', tag: 'Dreams', title: 'Guides in the Morning Choir', quote: '"I got woken up in the AM by a bird singing chirping — there\'s two of them that she loved and one other came — again frequently for your work."', outcome: '↑ Still getting her signs long after the reading' },
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