/**
 * Single source of truth for all Google Form links and drop status.
 * For the twice-monthly site adjustments, this is the only file to edit:
 *  - flip DROP.open when a drop goes live / fills up
 *  - update DROP.nextDropDate for the closed-state message
 */

// Form 1 — Session Booking Sheet (the bi-weekly reading drop)
export const BOOKING_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdI44Sz7QzmVC2dmlbZEDizfcj2-Gpx8PI4kGbw38B34YcTdg/viewform';

// Dream Unpacking Vault — for enrolled 6-month container students
export const DREAM_VAULT_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdyuwBLapPUvk1XPxBMSpH4pPUegaMOVapzq2U0xPNI8ffBew/viewform';

// Aura Care Order Form — Somatic Apothecary orders
export const AURA_CARE_ORDER_FORM_URL = 'https://forms.gle/4hKis9ZXdQ45EKCJ6';

// Dreamwork Matrix (Option 4, the "astral gym") — intake and sign-up form.
export const DREAMWORK_MATRIX_SIGNUP_URL = 'https://forms.gle/RUAt5kgafEq6pZCw5';

// Quantum Collapsing Manifestation Support — sign-up form for the 12-session package.
export const QUANTUM_SIGNUP_URL = 'https://forms.gle/1C1Ho3dyVdjSD2qj6';

// Eczema case study — the "Physical Health Changes" video essay on YouTube.
export const ECZEMA_CASE_STUDY_VIDEO_ID = '7VuUxYGqTy4';

// Programme booklet — the downloadable PDF walking through each facilitation offer's curriculum.
// Drop the file at public/assets/docs/facilitation-programmes.pdf (the path below) to publish it.
export const PROGRAMME_BOOKLET_URL = 'assets/docs/facilitation-programmes.pdf';

// The Drop — bespoke audio readings
export const DROP = {
  open: true,
  nextDropDate: 'end of July', // shown when open = false
  slotsPerDrop: 25,
  slotsPerMonth: 50,
};
