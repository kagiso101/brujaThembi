import { Component, inject } from '@angular/core';
import { ScrollRevealService } from '../../services/scroll-reveal.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [RouterLink, CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  activeTab = 'tarot';
  private reveal = inject(ScrollRevealService);
  ngAfterViewInit() { setTimeout(() => this.reveal.init(), 100); }
  setTab(tab: string) { this.activeTab = tab; }
}
