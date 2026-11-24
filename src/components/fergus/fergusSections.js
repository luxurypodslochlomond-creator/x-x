import { House, Send, Film, Trophy, Contact, MessageSquare } from 'lucide-react';
export const FERGUS_SECTIONS = [
  { id: 'home', label: 'My room', Icon: House },
  { id: 'note', label: 'Application', title: 'The note to send', line: 'The Higgsfield pitch, ready to copy.', Icon: Send, path: '/FergusHiggsfield' },
  { id: 'film', label: '60-second film', title: 'Make the film', line: 'The shots, the words and the free tools.', Icon: Film, path: '/FergusHiggsfieldVideo' },
  { id: 'football', label: 'Football', title: 'Player profile', line: 'The football page and the PDF for a coach.', Icon: Trophy, path: '/FergusHughesProfile' },
  { id: 'card', label: 'My card', title: 'A proper introduction', line: 'The card and the one-liner to pass on.', Icon: Contact, path: '/FergusCard' },
  { id: 'notes', label: 'Notes', Icon: MessageSquare },
];