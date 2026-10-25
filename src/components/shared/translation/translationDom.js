const tracked = new Map();
const SKIP = 'script, style, noscript, code, pre, textarea, select, option, [data-no-translate], [translate="no"], [contenteditable="true"]';
const KEEP = new Set(['X = X', 'UF51', 'SORTED', 'CB51', 'PETSOUNDS51', 'PET SOUNDS51', 'ZAPP', 'MAGIC51', 'LEARN51', 'TRACKT', 'BUZZSTOP', 'BUZZTRIP', 'CTRL51', 'SHED51', 'PROF51', 'EARTH51', 'ALETHEIA', 'HORIZON INTERNATIONAL']);

const read = (node) => node.nodeType === Node.TEXT_NODE ? node.nodeValue : node.getAttribute('placeholder');
const parentOf = (node) => node.nodeType === Node.TEXT_NODE ? node.parentElement : node;
const excluded = (node) => !parentOf(node) || parentOf(node).closest(SKIP);

function write(node, value, entry) {
  if (read(node) !== value) {
    if (node.nodeType === Node.TEXT_NODE) node.nodeValue = value;
    else node.setAttribute('placeholder', value);
  }
  entry.written = value;
}

export function isOurWrite(node) {
  const entry = tracked.get(node);
  return !!entry && entry.written === read(node);
}

export function eachWord(root, visit) {
  if (root.nodeType === Node.TEXT_NODE) { if (!excluded(root)) visit(root); return; }
  if (root.nodeType !== Node.ELEMENT_NODE || excluded(root)) return;
  if (root.hasAttribute('placeholder')) visit(root);
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => excluded(node) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT,
  });
  let node;
  while ((node = walker.nextNode())) visit(node);
  root.querySelectorAll('[placeholder]').forEach((field) => { if (!excluded(field)) visit(field); });
}

export function pruneWords() {
  for (const node of tracked.keys()) if (!node.isConnected) tracked.delete(node);
}

export function visitWord(node, dict, english = false) {
  if (!node.isConnected || excluded(node)) return null;
  const raw = read(node);
  if (!raw) return null;
  let entry = tracked.get(node);
  // Identity belongs to the node, never to a global list of translated strings.
  // 'Support' being unchanged in French must not exclude it from every other language.
  if (!entry || (raw !== entry.source && raw !== entry.written)) {
    entry = { source: raw, written: null };
    tracked.set(node, entry);
  }
  const source = entry.source.trim();
  if (english || !source || KEEP.has(source.toUpperCase()) || !/\p{L}/u.test(source) || /^(https?:\/\/|\S+@\S+\.\S+)/i.test(source)) {
    write(node, entry.source, entry);
    return null;
  }
  const translation = dict[source];
  write(node, translation ? entry.source.replace(source, translation) : entry.source, entry);
  return translation ? null : source;
}

export function scanWords(dict, english = false, root = document.body) {
  pruneWords();
  const missing = new Set();
  eachWord(root, (node) => {
    const source = visitWord(node, dict, english);
    if (source) missing.add(source);
  });
  return [...missing];
}