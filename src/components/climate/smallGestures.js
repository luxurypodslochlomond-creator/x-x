// ── ONE LIST, TWO ROOMS, AND NOW A DOOR OUT OF EACH LINE ──────────────────────────
// Janine's five smallest gestures were written inside the band that prints them, so the
// only way a second page could carry them was to copy the strings — and two copies of a
// list become two different lists the first time one is edited. The list lives here now:
// the record's own band and the map both read it from this one place.
//
// ── WHERE EACH ONE GOES ───────────────────────────────────────────────────────────
// Every one of these used to open the same place: the wall of drawings. Brian, 28
// November: "small gestures there's probably many more but they dont go to right place
// bro". He is right. A person who reads "using mass transportation" and lands on a wall
// of cartoons has been handed a picture instead of the thing — the drawing is not the
// act, and five different gestures pointing at one address is not five doors, it is one.
//
// So each gesture carries the words its subject is written in on this record, and
// useGestureDoors looks for an entry that actually answers it. If the record holds one,
// the gesture opens that entry. If it holds nothing — and today it holds nothing for
// four of these five — it opens the record's own search for that subject, which says
// plainly when there is nothing there. It never opens the wall, and it never guesses an
// entry that only nearly fits: a wrong door is worse than an honest empty room.
export const GESTURES = [
  'Repairing a sweater / cardigan',
  'Buying less',
  'Walking',
  'Using mass transportation',
  'Not wasting food',
];

// The words each gesture is written in, in the record's own filing. The first word is
// also the one the search is asked for when the record holds no entry on the subject.
export const GESTURE_WORDS = {
  'Repairing a sweater / cardigan': ['repair', 'textile', 'clothing'],
  'Buying less': ['buying less', 'consumption', 'second-hand', 'circular economy'],
  Walking: ['walking', 'walkable', 'active travel'],
  'Using mass transportation': ['transport', 'transit', 'busway'],
  'Not wasting food': ['food waste', 'surplus food', 'food rescue'],
};