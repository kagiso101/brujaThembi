import { Component, inject } from '@angular/core';
import { ScrollRevealService } from '../../services/scroll-reveal.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BOOKING_FORM_URL, DROP } from '../../shared/booking-links';

@Component({
  selector: 'app-contact',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private reveal = inject(ScrollRevealService);
  bookingFormUrl = BOOKING_FORM_URL;
  drop = DROP;

  form = { firstName: '', lastName: '', email: '', phone: '', service: '', message: '' };

  steps = [
    { num: '01', title: 'Reach Out', desc: 'Send a WhatsApp or fill in the form above. Include your name and the service you\'re interested in.' },
    { num: '02', title: 'Send Your Questions', desc: 'For readings — send your questions. For breathwork or programmes — share what you\'re hoping to work on.' },
    { num: '03', title: 'Make Payment', desc: 'Transfer to the banking details below and send proof of payment via WhatsApp. Session confirmed once payment reflects.' },
    { num: '04', title: 'Prepare Your Space', desc: 'You\'ll receive a preparation guide. For breathwork: avoid heavy meals 90 min before. For readings: have a notepad ready.' },
    { num: '05', title: 'Receive Your Session', desc: 'Recorded readings delivered within 48 hours. Live sessions scheduled via WhatsApp. All include a full written transcript.' },
  ];

  terms = [
    { num: 'I', title: 'Cancellations & Rescheduling', desc: '24 hours\' notice required. Sessions cancelled with less than 24 hours\' notice are charged at the full rate.' },
    { num: 'II', title: 'Breathwork Safety', desc: 'Avoid heavy meals at least 90 minutes before any breathwork session begins.' },
    { num: 'III', title: 'Health Disclosures', desc: 'If you have cardiovascular concerns, high blood pressure, or are pregnant, notify Bruja privately before booking.' },
    { num: 'IV', title: 'Recordings & Transcripts', desc: 'All readings include a full written transcript. Recordings shared within 48 hours of payment confirmation.' },
    { num: 'V', title: 'Courier (Products)', desc: 'R150 courier charge for individual orders. The Aura Care Box includes courier in the R1,000 price.' },
    { num: 'VI', title: 'Programme Deposits', desc: 'Deposits secure your seat. The balance is payable in monthly instalments as outlined per programme.' },
  ];

  activeTab = 'tarot';
  setTab(t: string) { this.activeTab = t; }

  ngAfterViewInit() { setTimeout(() => this.reveal.init(), 100); }

  handleSubmit() {
    const name = `${this.form.firstName} ${this.form.lastName}`;
    const msg = encodeURIComponent(`Hi Bruja Thembi!\n\nName: ${name}\nService: ${this.form.service}\n\n${this.form.message}`);
    window.open(`https://wa.me/27793574091?text=${msg}`, '_blank');
  }
}
