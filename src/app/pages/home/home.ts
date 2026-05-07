import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { ScrollRevealService } from '../../services/scroll-reveal.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, OnDestroy {
  private reveal = inject(ScrollRevealService);

  testimonials = [
    {
      quote: "I just received a msg that abenzi bobubi are panicking — things are not going well for them. My guides said they can no longer reach me spiritually. I must ignore it and keep going.",
      cite: "Client feedback — Following Bruja Thembi Engagement"
    },
    {
      quote: "As soon as I accept this job so many opportunities popped up — worse the ones I had been praying for. Someone texted me on my first day at the corporate job to camera operate their podcast and they're paying me R12,000 — way more than my current job and side gig combined.",
      cite: "Client feedback — Career & Abundance Shift"
    },
    {
      quote: "In June 2023 the job I got in Gauteng, salary was R45,000, car allowance was R9,600 and cellphone allowance R800. Oh my what is this 🥹 Can't believe I manifested this exactly.",
      cite: "Client feedback — Written in 2021, Manifested 2023"
    },
    {
      quote: "I received an email from the university that I've been chosen to represent them in Brazil at a top business school. Me! I am held, I am protected. I broke down just now — sheer tears of joy and GRATITUDE. I am going to Brazil to represent this top South African business school. Me!!",
      cite: "Client feedback — Academic & International Breakthrough"
    },
  ];

  activeIndex = signal(0);
  private interval: any;

  ngOnInit() {
    this.interval = setInterval(() => {
      this.activeIndex.update(i => (i + 1) % this.testimonials.length);
    }, 3000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  goTo(index: number) {
    this.activeIndex.set(index);
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.activeIndex.update(i => (i + 1) % this.testimonials.length);
    }, 3000);
  }

  ngAfterViewInit() { setTimeout(() => this.reveal.init(), 100); }
}