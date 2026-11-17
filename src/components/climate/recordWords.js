// ── TWO WORDS ABOUT PEOPLE, WRITTEN ONCE ───────────────────────────────────────
// Brian, 17 November 2026: "should we change keepers word everywhere to custodians …
// better word than checkers, that would resonate slightly bit for right reasons."
//
// He is right, and the reasons are worth writing down so nobody has to re-argue it.
//
// KEEPER. It was doing two jobs badly. A keeper sounds like a person who holds something
// still — a zoo keeper, a gatekeeper — and the record's role is not to hold the record
// still but to answer for it: to say yes, or not yet, in their own name, and to be the
// person a reader can hold to that. CUSTODIAN is the word museums and archives use for
// exactly this: somebody who looks after a thing that is not theirs, on behalf of people
// they will never meet. That sentence is the whole of this record's ethic, and the word
// now says it in one go. It also stops the role sounding like a rank, which is the thing
// that made "keeper" grate.
//
// CHECKER. This one was worse. A checker checks — and a record whose entire claim is that
// it can be questioned cannot call the people who question it "checkers": the word sounds
// like a job at a barrier, and it invites the one misreading this record must never allow,
// that these are the people who decide what is true. They do not decide anything. They read
// what somebody else has already written, after the person who wrote it, and put their name
// to what they found. In publishing that role has had a name for two hundred years: the
// SECOND READER. It is modest, it is a real job rather than a title the record invented, it
// says exactly what happens and in what order, and it gives a volunteer something to be
// proud of that is honest — the second pair of eyes, not the final word.
//
// WHAT THESE CONSTANTS ARE NOT. They are not the data. The code still says keeper and
// checker in its field names, routes and function names (ClimateChecker.is_keeper,
// /ClimateKeeperRoom, climateAccessChange …), because renaming stored fields is a migration
// and a migration is a day of risk for a word a reader never sees. This module is the one
// place the *reader's* words live, so the next change of mind is one file and not eighty.
export const CUSTODIAN = 'custodian';
export const CUSTODIANS = 'custodians';
export const CUSTODIANS_ROOM = 'Custodians’ room';

export const SECOND_READER = 'second reader';
export const SECOND_READERS = 'second readers';

// Capitalised where a list heading or a label needs it.
export const CUSTODIANS_TITLE = 'Custodians';
export const SECOND_READERS_TITLE = 'Second readers';