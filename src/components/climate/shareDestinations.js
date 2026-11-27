// ── EVERY DOOR, IN WORDS ──────────────────────────────────────────────────────
// Brian, 27 November: "leave no one out… be other countries… activism too… don't want lots
// of icons bro… simple as fuck."
//
// He is right on both counts, and they point the same way. A grid of fifteen logos is a
// product advert; a line of names is a signpost. So nothing here is drawn: each door is
// its name and nothing else, and the eye reads a sentence rather than counting pictures.
//
// And the list is not the usual western five. A record that says nobody is left behind
// cannot stop at WhatsApp and X: Weibo, QQ and Line are how the majority of the planet
// actually passes a thing on, and a QR is the only door that opens inside WeChat, where a
// foreign link is stopped at the wall. Every door below takes the same two things — the
// address, and the words that travel with it — so nothing is written twice.

const enc = encodeURIComponent;

// Each door is given { link, title, message } and answers with where it opens.
export const SHARE_GROUPS = [
  {
    label: 'To one person',
    doors: [
      { name: 'WhatsApp', href: ({ message }) => `https://wa.me/?text=${enc(message)}` },
      { name: 'Telegram', href: ({ link, title }) => `https://t.me/share/url?url=${enc(link)}&text=${enc(title)}` },
      { name: 'Email', href: ({ title, message }) => `mailto:?subject=${enc(title)}&body=${enc(message)}` },
      { name: 'Text message', href: ({ message }) => `sms:?&body=${enc(message)}` },
      { name: 'Viber', href: ({ title, link }) => `viber://forward?text=${enc(`${title} ${link}`)}` },
    ],
  },
  {
    label: 'To a room',
    doors: [
      { name: 'Instagram', href: null, how: 'save the image above, then post it' },
      { name: 'Facebook', href: ({ link }) => `https://www.facebook.com/sharer/sharer.php?u=${enc(link)}` },
      { name: 'LinkedIn', href: ({ link }) => `https://www.linkedin.com/sharing/share-offsite/?url=${enc(link)}` },
      { name: 'X', href: ({ link, title }) => `https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(link)}` },
      { name: 'Bluesky', href: ({ link, title }) => `https://bsky.app/intent/compose?text=${enc(`${title} ${link}`)}` },
      { name: 'Threads', href: ({ link, title }) => `https://www.threads.net/intent/post?text=${enc(`${title} ${link}`)}` },
      { name: 'Reddit', href: ({ link, title }) => `https://www.reddit.com/submit?url=${enc(link)}&title=${enc(title)}` },
      { name: 'Pinterest', href: ({ link, title }) => `https://pinterest.com/pin/create/button/?url=${enc(link)}&description=${enc(title)}` },
      { name: 'Tumblr', href: ({ link, title }) => `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${enc(link)}&caption=${enc(title)}&posttype=link` },
      { name: 'Lemmy', href: ({ link, title }) => `https://lemmy.world/create_post?url=${enc(link)}&title=${enc(title)}` },
      { name: 'Discord', href: null, how: 'copy the link into the channel' },
      { name: 'Signal', href: null, how: 'copy the link into the chat' },
    ],
  },
  {
    label: 'Across borders',
    doors: [
      { name: 'Weibo', href: ({ link, title }) => `https://service.weibo.com/share/share.php?url=${enc(link)}&title=${enc(title)}` },
      { name: 'QQ', href: ({ link, title }) => `https://connect.qq.com/widget/shareqq/index.html?url=${enc(link)}&title=${enc(title)}` },
      { name: 'Line', href: ({ link }) => `https://social-plugins.line.me/lineit/share?url=${enc(link)}` },
      { name: 'Mastodon', href: ({ link, title }) => `https://mastodon.social/share?text=${enc(`${title} ${link}`)}` },
      { name: 'WeChat', href: null, how: 'scan the QR below' },
      { name: 'KakaoTalk', href: null, how: 'the share sheet above' },
    ],
  },
];

// ── THE SENTENCE THAT LEAVES NOBODY OUT ──────────────────────────────────────
// Every door above needs a web address to open, and most of the apps a young activist
// actually lives in do not publish one. Naming them and then offering a button that does
// nothing would be worse than silence. So they are named once, here, and pointed at the
// one thing that really does reach them: the share sheet, which knows every app installed
// on the phone. TikTok and Snapchat will not take a link from a browser at all; Twitch and
// YouTube have no share address; Nostr and Matrix belong to networks with no single home.
// None of them is left out. They simply open the way they open.
export const SHARE_REST =
  'TikTok, Snapchat, YouTube, Twitch, Nostr, Matrix, WhatsApp groups and every other app on this phone — the share sheet above.';