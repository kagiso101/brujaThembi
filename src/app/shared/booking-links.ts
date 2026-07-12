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
export const AURA_CARE_ORDER_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeWEz8bdLSvtX_LO0XKTuGDLVB-w-R9tvCONgtW7RG3kVgP_Q/viewform';

// The Drop — bespoke audio readings
export const DROP = {
  open: true,
  nextDropDate: 'end of July', // shown when open = false
  slotsPerDrop: 25,
  slotsPerMonth: 50,
};
