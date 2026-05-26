import { AfterViewInit, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ScrollRevealService } from '../../services/scroll-reveal.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface ChatMessage {
  text: string;
  time: string;
  sender: 'them' | 'me';
}

interface Testimonial {
  tag: string;
  messages: ChatMessage[];
}

@Component({
  selector: 'app-corporate',
  imports: [RouterLink, CommonModule],
  templateUrl: './corporate.html',
  styleUrl: './corporate.scss',
})
export class Corporate implements AfterViewInit, OnInit, OnDestroy {
  activeTab = 'tarot';
  private reveal = inject(ScrollRevealService);

  testimonials: Testimonial[] = [
    {
      tag: 'Career Breakthrough',
      messages: [
        {
          text: 'Thokoza GOGO. It is happening…… 🥹🥹🥹. Today my boss came n announced that she is promoting me to Operations Manager.',
          time: '3:40 pm',
          sender: 'them'
        },
        {
          text: '💃🏽💃🏽💃🏽💃🏽💃🏽🎉🎉❤️❤️🎉',
          time: '3:40 pm',
          sender: 'them'
        },
        {
          text: 'Angaz ngithini mengibonga kuwe nedalwa zakini Gogo. Izandla zendlula ikhanda, Ngiyabonga Gogo. 🙏🏼🥹🥹🥹🥹🙂',
          time: '3:41 pm',
          sender: 'them'
        },
        {
          text: 'This is amazing news!! Congratulations 🎊🎉💃',
          time: '4:48 pm',
          sender: 'me'
        }
      ]
    },
    {
      tag: 'Leadership Recognition',
      messages: [
        {
          text: 'Can you guess who is heading the incorporation of AI in operations in our organization?',
          time: '2:10 pm',
          sender: 'them'
        },
        {
          text: '❤️',
          time: '',
          sender: 'me'
        },
        {
          text: 'You don\'t say 😍',
          time: '',
          sender: 'me'
        },
        {
          text: 'I do say.. I\'m beyond humbled, top management didn\'t think that I wanted the challenge because I just went mute when they broke the news.',
          time: '2:13 pm',
          sender: 'them'
        },
        {
          text: 'The way you keep leveling up 📿 bontatemoholo didn\'t come to play games, like at all!!! They don\'t play',
          time: '2:31 pm',
          sender: 'me'
        }
      ]
    },
    {
      tag: 'Clarity & Stability',
      messages: [
        {
          text: 'Thank you 🙏🏼',
          time: '2:04 pm',
          sender: 'them'
        },
        {
          text: 'Thokoza Bruja. I hope you are well. I received the book and aura products on Friday 🙌🏽 Thank you so much',
          time: '6:14 pm',
          sender: 'them'
        },
        {
          text: 'Something definitely shifted at last week\'s class. I\'m finding myself automatically writing longer and less censored entries during my daily journaling over the past couple of days.',
          time: '6:18 pm',
          sender: 'them'
        }
      ]
    }
  ];

  currentIndex = 0;
  private autoplayInterval?: ReturnType<typeof setInterval>;
  private readonly autoplayDelay = 7000;

  ngOnInit() {
    this.startAutoplay();
  }

  ngAfterViewInit() {
    setTimeout(() => this.reveal.init(), 100);
  }

  ngOnDestroy() {
    this.stopAutoplay();
  }

  setTab(tab: string) {
    this.activeTab = tab;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
    this.restartAutoplay();
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
    this.restartAutoplay();
  }

  goTo(index: number) {
    this.currentIndex = index;
    this.restartAutoplay();
  }

  pauseAutoplay() {
    this.stopAutoplay();
  }

  resumeAutoplay() {
    this.startAutoplay();
  }

  private startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
    }, this.autoplayDelay);
  }

  private stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = undefined;
    }
  }

  private restartAutoplay() {
    this.stopAutoplay();
    this.startAutoplay();
  }
}