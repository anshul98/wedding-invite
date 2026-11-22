// All editable text & photos for the save-the-date screen.

export const TITLE = {
  intro: 'We are getting married',
  names: 'Anshul & Aishwarya',
}

/*
 * Photos shown on the slip that comes out of the slot (top → bottom).
 * Replace `null` with an imported image, e.g.
 *   import photo1 from '../../assets/images/photo1.jpg'
 *   export const SLIP_PHOTOS = [photo1, photo2, photo3]
 */
export const SLIP_PHOTOS = [null, null, null]

/* Letter shown inside the frame on the second screen. Edit freely (3–4 short lines read best). */
export const LETTER = {
  heading: 'Dearest Gentle Reader!',
  lines: [
    'It has come to this author’s attention that a most delightful union is upon us.',
    'Anshul and Aishwarya request the pleasure of your company',
    'as they begin their happily ever after.',
    'Do keep the date — further particulars shall follow.',
  ],
}

/* Third screen: wedding date with the slot machine */
export const WEDDING_DATE = {
  intro: 'Our Wedding Date',
  heading: 'Save the Date',
  // what the three reels stop on (left → right)
  reels: ['27', 'FEB', '27'],
  calendarLabel: 'Calendar',
}

/* Fourth screen: venue over the Lucknow photo */
export const VENUE = {
  intro: 'Where?',
  label: 'Location',
  city: 'Lucknow',
  lines: [
    'The City of Nawabs, where tehzeeb meets timeless charm.',
    'Join us amid grand gateways, fragrant kebabs and the warmth of Lucknowi hospitality.',
  ],
  directionsLabel: 'Get Direction',
  // Placeholder — replace with the venue's Google Maps link
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Lucknow',
}

/* Last screen: closing note over stripes, with the footer archway */
export const CLOSING = {
  names: 'Anshul & Aishwarya',
  message: 'We will be happy to share this day together',
  date: '27th February 2027',
  hashtag: '#AnshulkiAishHogyi',
  note: 'Formal invites to follow soon',
}
