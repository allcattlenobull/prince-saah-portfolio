// The idea wall: every problem is a card pinned up; tapping one opens its story.
const CONTACT_LINK = 'contact.html';
// Archived stories stay in the admin but never appear on the site.
const projects = (window.PORTFOLIO_PROJECTS || []).filter(p => p && !p.archived);
const $ = s => document.querySelector(s);
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

function h(tag, props = {}, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === 'style') el.style.cssText = v;
    else if (k in el) el[k] = v;
    else el.setAttribute(k, v);
  }
  kids.flat().forEach(k => k != null && el.append(k));
  return el;
}

const PROJECT_SCREENS = {
  hiring: [
    { label: 'Role intake · pilot demo', src: 'assets/screens/talent-intake.png' },
    { label: 'Job classification · pilot demo', src: 'assets/screens/talent-classification.png' }
  ],
  mwana: [
    { label: 'Public website', src: 'assets/screens/mwana-home.png' },
    { label: 'Website editor · admin portal', src: 'assets/screens/mwana-editor.png' },
    { label: 'Practice finances · amounts hidden', src: 'assets/screens/mwana-finance.png' }
  ],
  acnb: [
    { label: 'Public homepage', src: 'assets/screens/acnb-home.png' },
    { label: 'Fund overview · figures hidden', src: 'assets/screens/acnb-dashboard.png' },
    { label: 'Inside the workspace · how it works', src: 'assets/screens/acnb-workspace.png' }
  ],
  him: [
    { label: 'The Edge homepage', src: 'assets/screens/the-edge-home.png' },
    { label: 'Fantasy tools', src: 'assets/screens/the-edge-tools.png' },
    { label: 'Trade calculator', src: 'assets/screens/the-edge-trade.png' }
  ]
};

function buildProjectScreens(id) {
  const items = PROJECT_SCREENS[id];
  if (!items) return null;
  const note = id === 'hiring'
    ? 'Screens from the local pilot demo, using sample data.'
    : (id === 'mwana' || id === 'acnb')
      ? 'Screens captured in November 2026. Private financial figures are hidden.'
      : 'Screens captured from the live site in November 2026.';
  return h('section', { className: 'real-views', style: '--d:6', 'aria-label': 'Project screenshots' },
    h('p', { className: 'real-views-kicker' }, 'inside the project'),
    h('p', { className: 'real-views-note' }, note),
    ...items.map(item => h('figure', { className: 'project-screen' },
      h('a', { href: item.src, target: '_blank', rel: 'noopener noreferrer', 'aria-label': `Open full-size image: ${item.label}` },
        h('img', { src: item.src, alt: item.label, loading: 'lazy' })
      ),
      h('figcaption', {}, item.label, h('span', { 'aria-hidden': 'true' }, '↗'))
    ))
  );
}

// Public pages are live project views, never reconstructed interface graphics.
const PUBLIC_PROJECT_VIEWS = {
  called: [
    { label: 'Called home', url: 'https://www.walkyourcalling.com/' },
    { label: 'Explore', url: 'https://www.walkyourcalling.com/explore/' },
    { label: 'Career exploration', url: 'https://www.walkyourcalling.com/careers/' }
  ]
};

function buildProjectViews(id) {
  const items = PUBLIC_PROJECT_VIEWS[id];
  if (!items || !items.length) return null;
  return h('section', { className: 'real-views', style: '--d:6', 'aria-label': 'Live project views' },
    h('p', { className: 'real-views-kicker' }, 'the real thing, live'),
    h('p', { className: 'real-views-note' }, 'These are live public pages, not recreated mockups.'),
    ...items.map(item => h('div', { className: 'real-view' },
      h('div', { className: 'real-view-heading' },
        h('strong', {}, item.label),
        h('a', { href: item.url, target: '_blank', rel: 'noopener noreferrer' }, 'Open page')
      ),
      h('iframe', { src: item.url, title: item.label, loading: 'lazy', referrerPolicy: 'no-referrer' })
    ))
  );
}

/* ---------- The wall ---------- */
// Where each card is pinned on big screens (side, distance from that side, top, tilt).
const SLOTS = [
  { side: 'left', at: '0%', top: 30, r: -5 },
  { side: 'right', at: '1%', top: 10, r: 4 },
  { side: 'left', at: '1%', top: 640, r: 3 },
  { side: 'left', at: '37%', top: 740, r: -2 },
  { side: 'right', at: '0%', top: 660, r: -4 }
];
const PIN_SLOT = { side: 'right', at: '5%', top: 912, r: 5 };
const LOOSE_TILT = [-2.5, 2, -1.5, 2.5, -2, 1.5];

const wallProjects = projects.filter(p => p.id !== 'me');
const stampFor = s => {
  const v = (s || '').toLowerCase();
  if (v.includes('live') || v.includes('deployed')) return ['BUILT', true];
  if (v.includes('prototype')) return ['PROTOTYPE', false];
  if (v.includes('develop') || v.includes('ongoing')) return ['BUILDING', false];
  return [null, false];
};

const ideasEl = $('#ideas');
// More cards than pin spots: lay the whole wall out as a loose grid instead.
if (wallProjects.length > SLOTS.length) ideasEl.closest('.wall').classList.add('crowded');
const cards = {};
function place(li, slot) {
  if (!slot) return;
  li.style.setProperty('--top', slot.top + 'px');
  li.style[slot.side] = slot.at;
}
wallProjects.forEach((p, i) => {
  const [stamp, built] = stampFor(p.status);
  const card = h('a', { className: 'idea', href: '#' + p.id, style: `--r:${(SLOTS[i] || {}).r ?? LOOSE_TILT[i % LOOSE_TILT.length]}deg` },
    h('span', { className: 'q' }, p.problem),
    h('span', { className: 't' }, p.title),
    stamp ? h('span', { className: 'stamp' + (built ? ' built' : '') }, stamp) : null
  );
  card.addEventListener('click', e => { e.preventDefault(); open(p.id, card); });
  const li = h('li', {}, card);
  place(li, SLOTS[i], i);
  cards[p.id] = card;
  ideasEl.append(li);
});
{
  const pin = h('a', { className: 'idea pin', href: CONTACT_LINK, style: `--r:${PIN_SLOT.r}deg` },
    h('span', { className: 'q' }, '+ Pin your problem here'));
  const li = h('li', {}, pin);
  if (wallProjects.length <= SLOTS.length) place(li, PIN_SLOT);
  ideasEl.append(li);
}

/* ---------- The story ---------- */
const sheet = $('#sheet');
const scroller = $('#sheet-scroll');
const story = $('#story');
let current = null, lastCard = null, pushed = false, storyObserver;

function buildStory(p) {
  const [stamp, built] = stampFor(p.status);
  const rnd = (a, b) => (a + Math.random() * (b - a)).toFixed(1);
  const parts = [
    h('p', { className: 'story-q' }, p.problem),
    h('div', { className: 'story-meta' },
      stamp ? h('span', { className: 'stamp' + (built ? ' built' : '') }, stamp) : null,
      h('span', {}, [p.category, p.status].filter(Boolean).join(' · '))),
    h('h2', { id: 'story-title' }, p.title),
    p.description ? h('p', { className: 'story-lead' }, p.description) : null
  ];
  if (p.why) {
    parts.push(h('p', { className: 'story-why' }, p.why));
    if (Array.isArray(p.scraps) && p.scraps.length) {
      parts.push(h('div', { className: 'tray', 'aria-hidden': 'true' },
        h('div', { className: 'tray-bar' }, h('i'), h('i'), h('i'), h('span', {}, p.title)),
        h('div', { className: 'tray-grid' }, ...p.scraps.map((t, i) => h('span', {
          className: 'scrap', style: `--x:${rnd(-60, 60)}px;--y:${rnd(-50, 50)}px;--r:${rnd(-14, 14)}deg;--i:${i}`
        }, t)))));
    }
  }
  if (p.built) parts.push(h('p', { className: 'story-built' }, p.built));
  if (p.value) parts.push(h('p', { className: 'story-value' }, h('span', { className: 'hl' }, p.value)));
  else if (p.detail) parts.push(h('p', { className: 'story-why' }, p.detail));
  parts.push(buildProjectScreens(p.id), buildProjectViews(p.id));

  const actions = h('div', { className: 'story-actions' });
  if (p.url) actions.append(h('a', Object.assign({ className: 'button', href: p.url },
    /^https?:/.test(p.url) ? { target: '_blank', rel: 'noopener noreferrer' } : {}), p.linkText || 'Visit the project'));
  if (p.id === 'me') actions.append(h('a', { className: 'button ghost', href: 'book.html' }, 'Book a call'),
    h('a', { className: 'button ghost', href: 'consulting.html' }, 'How I work'));
  if (actions.children.length) parts.push(actions);

  const list = wallProjects.some(q => q.id === p.id) ? wallProjects : projects;
  const next = list[(list.findIndex(q => q.id === p.id) + 1) % list.length];
  if (next && next.id !== p.id) {
    const btn = h('button', { className: 'story-next', type: 'button' },
      h('span', {}, h('small', {}, 'next on the wall'), h('b', {}, next.title)), h('span', { 'aria-hidden': 'true' }, '→'));
    btn.addEventListener('click', () => show(next.id, true));
    parts.push(btn);
  }
  parts.push(h('div', { className: 'story-foot' }, h('span', {}, 'Prince Saah'),
    h('nav', { 'aria-label': 'Site' }, h('a', { href: 'consulting.html' }, 'Consulting'),
      h('a', { href: CONTACT_LINK }, 'Contact'), h('a', { href: 'book.html' }, 'Book a call'))));
  story.replaceChildren(...parts.filter(Boolean));
}

function watchTray() {
  if (storyObserver) storyObserver.disconnect();
  const tray = story.querySelector('.tray');
  if (!tray) return;
  storyObserver = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('sorted'); storyObserver.disconnect(); }
  }), { root: scroller, rootMargin: '0px 0px -25% 0px', threshold: .6 });
  storyObserver.observe(tray);
}

function show(id, replace) {
  const p = projects.find(q => q.id === id);
  if (!p) return;
  current = id;
  buildStory(p);
  scroller.scrollTop = 0;
  watchTray();
  if (replace) history.replaceState({ id }, '', '#' + id);
  story.focus({ preventScroll: true });
}

function open(id, card) {
  if (!projects.some(q => q.id === id)) return;
  lastCard = card || cards[id] || null;
  if (lastCard) lastCard.classList.add('lifted');
  const go = () => {
    show(id);
    sheet.hidden = false;
    document.body.classList.add('sheet-on');
    requestAnimationFrame(() => requestAnimationFrame(() => sheet.classList.add('open')));
    if (location.hash !== '#' + id) { history.pushState({ id }, '', '#' + id); pushed = true; }
  };
  reduce || !lastCard ? go() : setTimeout(go, 180);
}

function close() {
  if (sheet.hidden) return;
  sheet.classList.remove('open');
  if (storyObserver) storyObserver.disconnect();
  setTimeout(() => {
    sheet.hidden = true;
    document.body.classList.remove('sheet-on');
    if (lastCard) { lastCard.classList.remove('lifted'); lastCard.focus({ preventScroll: true }); }
    current = null;
  }, reduce ? 0 : 400);
}

function requestClose() {
  if (pushed) { pushed = false; history.back(); }
  else { history.replaceState(null, '', location.pathname + location.search); close(); }
}

$('.sheet-close').addEventListener('click', requestClose);
sheet.addEventListener('click', e => { if (e.target === scroller) requestClose(); });
addEventListener('keydown', e => {
  if (sheet.hidden) return;
  if (e.key === 'Escape') { e.preventDefault(); requestClose(); }
  if (e.key === 'Tab') {
    const f = [...sheet.querySelectorAll('a[href], button')];
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === story)) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});
document.querySelectorAll('a[href="#me"]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); open('me'); }));
addEventListener('popstate', () => {
  const id = location.hash.slice(1);
  if (!id || !projects.some(q => q.id === id)) { pushed = false; close(); return; }
  if (sheet.hidden) open(id); else if (id !== current) show(id);
});

// Deep links like createwithprince.com/#called open that story directly.
{
  const id = location.hash.slice(1);
  if (id && projects.some(q => q.id === id)) open(id);
}
