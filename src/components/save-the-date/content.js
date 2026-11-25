// All editable text & photos for the save-the-date screen.
//
// Two versions of the invite, differing only in the order of the names:
//   groom's side → aishwaryaanshul.site      (and any other address) → "Anshul & Aishwarya"
//   bride's side → aishwaryaanshul.site/b                            → "Aishwarya & Anshul"
// Everything else (date, venue, photos, hashtag…) is shared.
// The WhatsApp preview text for each side lives in index.html / scripts/postbuild.mjs.
import photo1 from '../../assets/images/photo1.webp'
import photo2 from '../../assets/images/photo2.webp'
import photo3 from '../../assets/images/photo3.webp'

export const SIDES = {
  groom: ['Anshul', 'Aishwarya'],
  bride: ['Aishwarya', 'Anshul'],
}

/* Text that contains the names, in the order for `side` ('groom' | 'bride') */
export function getNamedContent(side = 'groom') {
  const [first, second] = SIDES[side] ?? SIDES.groom
  const names = `${first} & ${second}`
  return {
    pageTitle: `${names} · Save the Date`,
    TITLE: { ...TITLE, names },
    LETTER: { ...LETTER, lines: LETTER.lines.map((l) => l.replace('{names}', `${first} and ${second}`)) },
    WEDDING_DATE: { ...WEDDING_DATE, calendarUrl: calendarUrl(`${names} - Wedding`) },
    CLOSING: { ...CLOSING, names },
  }
}

export const TITLE = {
  intro: 'We are getting married',
  names: '', // filled in by getNamedContent()
}

/*
 * Photos shown on the slip that comes out of the slot (top → bottom).
 * Each is cropped to a slightly wide 5:4 frame; `focus` = which part stays in view
 * ('50% 30%' = centre horizontally, upper third vertically) so both faces fit.
 * The .webp files are small copies of photo1/2/3.png made for the strip.
 */
export const SLIP_PHOTOS = [
  { src: photo1, focus: '50% 34%' },
  { src: photo2, focus: '50% 50%' },
  { src: photo3, focus: '50% 52%' },
]

/* Letter shown inside the frame on the second screen. Edit freely (3–4 short lines read best). */
export const LETTER = {
  heading: 'Dearest Gentle Reader!',
  lines: [
    'It has come to this author’s attention that a most delightful union is upon us.',
    '{names} request the pleasure of your company', // {names} → "Anshul and Aishwarya" / "Aishwarya and Anshul"
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
  calendarUrl: '', // filled in by getNamedContent()
}

/*
 * "Calendar" button → opens Google Calendar's "create event" page, pre-filled.
 * All-day event on 27 Feb 2027: Google wants the day AFTER as the end date (20270228).
 * No repeat rule, so it's a one-off event.
 */
function calendarUrl(title) {
  return (
    'https://calendar.google.com/calendar/render?' +
    new URLSearchParams({
      action: 'TEMPLATE',
      text: title,
      dates: '20270227/20270228',
      location: 'Lucknow',
    }).toString()
  )
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
  names: '', // filled in by getNamedContent()
  message: 'We will be happy to share this day together',
  date: '27th February 2027',
  hashtag: '#AnshulkiAishHogyi',
  note: 'Formal invites to follow soon',
}
