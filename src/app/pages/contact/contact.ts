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
    { num: '01', title: 'Get In Touch', desc: 'Send a WhatsApp or fill in the form above. Tell her your name and what you are after.' },
    { num: '02', title: 'Send Your Questions', desc: 'Booking a reading? Send your questions. Anything else? Just say what you are dealing with.' },
    { num: '03', title: 'Pay', desc: 'Transfer using the banking details below and send proof of payment on WhatsApp. You are booked as soon as the money shows.' },
    { num: '04', title: 'Get Ready', desc: 'She sends you a short guide. For breathwork: no heavy meals 90 minutes before. For readings: have something to write with.' },
    { num: '05', title: 'Your Session', desc: 'Recorded readings come back to you within 48 hours. Live sessions get booked on WhatsApp. Either way you get a written copy to keep.' },
  ];

  terms = [
    { num: 'I', title: 'Cancelling or Moving a Session', desc: 'Let her know at least 24 hours before. Any later than that and the session is charged in full.' },
    { num: 'II', title: 'Before Breathwork', desc: 'Do not eat a heavy meal in the 90 minutes before a breathwork session.' },
    { num: 'III', title: 'Tell Her About Your Health', desc: 'If you have heart trouble, high blood pressure, or you are pregnant, tell Bruja privately before you book.' },
    { num: 'IV', title: 'Recordings & Written Copies', desc: 'Every reading comes with a full written copy. Recordings are sent within 48 hours of your payment clearing.' },
    { num: 'V', title: 'Courier', desc: 'R150 for single orders. The Aura Care Box already has courier included in the R1,000.' },
    { num: 'VI', title: 'Course Deposits', desc: 'Your deposit holds your place. The rest is paid off monthly, as set out for each course.' },
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
