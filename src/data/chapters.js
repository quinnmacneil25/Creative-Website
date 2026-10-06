/**
 * Five chapters, one per 48 frames (2.00s) of the 240-frame sequence.
 * `side` alternates so the copy always sits opposite the focal point of
 * the shot, keeping the architecture unobstructed.
 */
export const CHAPTERS = [
  {
    n: 'I',
    side: 'left',
    eyebrow: 'Thar Frontier · Rajasthan',
    title: ['Where the desert', 'keeps its gold.'],
    body: 'Nine suites. Four hundred lanterns. One family at a time.',
    scroll: 'Scroll to enter',
  },
  {
    n: 'II',
    side: 'right',
    eyebrow: 'Chapter II · The Gate',
    title: ['Nine feet of teak,', 'opened once a day.'],
    body: 'Eleven months of carving. Closed at dusk, opened for you alone.',
  },
  {
    n: 'III',
    side: 'left',
    eyebrow: 'Chapter III · The Water Court',
    title: ['A courtyard built', 'to hold the evening.'],
    body: 'Forty metres of still water. Dinner is laid along its edge.',
  },
  {
    n: 'IV',
    side: 'right',
    eyebrow: 'Chapter IV · The Colonnade',
    title: ['Sixty columns.', 'One view.'],
    body: 'The hall runs the width of the palace and stops at nothing but sky.',
  },
  {
    n: 'V',
    side: 'footer',
    eyebrow: 'Chapter V · The Terrace',
    title: ['Stay until the sun', 'clears the fields.'],
  },
];

export const FOOTER = {
  cta: 'Reserve the Palace',
  note: 'October to March. One booking held per night.',
  columns: [
    {
      h: 'Visit',
      items: ['Jaisalmer District', 'Rajasthan 345001', 'India'],
    },
    {
      h: 'Enquire',
      items: ['+91 294 000 000', 'stay@rannmahal.in', 'Reservations, 9–6 IST'],
    },
    {
      h: 'The House',
      items: ['Nine suites', 'Private dining', 'Stables & step-well'],
    },
  ],
};
