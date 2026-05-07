import { AfterViewInit, Component, inject } from '@angular/core';
import { ScrollRevealService } from '../../services/scroll-reveal.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-corporate',
  imports:[RouterLink, CommonModule],
  templateUrl: './corporate.html',
  styleUrl: './corporate.scss',
})
export class Corporate implements AfterViewInit {
  activeTab = 'tarot';
  private reveal = inject(ScrollRevealService);

  ngAfterViewInit() { setTimeout(() => this.reveal.init(), 100); }
  setTab(tab: string) { this.activeTab = tab; }
}
