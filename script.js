const CONTACT_EMAIL = 'saah.pc@gmail.com';
const CONTACT_LINK = 'mailto:' + CONTACT_EMAIL;

const projects = [
  {
    id: 'hiring', tint: '#eef3ff',
    problem: 'What if every hiring manager had an AI talent acquisition partner to make hiring less overwhelming?',
    scraps: ['business need', 'role intake', 'classification', 'compensation', 'search plan', 'approvals'],
    category: 'People and hiring', title: 'UMN Talent Workspace', status: 'Local prototype',
    description: 'A hiring workspace that helps managers move from an open position to a more thoughtful, structured search.',
    why: 'Hiring managers have to turn an evolving business need into a clear role, navigate classification and compensation, and plan a fair search. Those steps are often scattered across documents, tools, and people.',
    built: 'This local pilot for the University of Minnesota brings role intake, job classification, compensation, and search planning into a guided workflow. AI helps draft and surface recommendations; hiring professionals keep the decisions.',
    value: 'The aim is to give managers a clearer path through a complex process, while helping teams spend more attention on the people and judgment that hiring requires.'
  },
  {
    id: 'mwana', tint: '#ebfaf0',
    problem: 'How can a small practice spend less time managing the business?',
    scraps: ['website', 'payments', 'expenses', 'invoices', 'records', 'site edits'],
    category: 'Small business operations', title: 'Mwana Therapy', status: 'Deployed',
    description: 'A public website and administrative workspace built around the everyday needs of a small therapy practice.',
    why: 'Running a practice means caring for people while keeping up with a website, payments, expenses, invoices, and records. For a small team, that administrative work can crowd out time and attention.',
    built: 'Mwana brings its public website and an admin workspace together. The workspace supports editing the site, tracking business transactions and invoices, and organizing accounting records.',
    value: 'The goal is to make the business side more manageable, so the people running the practice can devote more energy to the families they serve.',
    url: 'https://www.mwanatherapy.com/', linkText: 'Visit Mwana Therapy'
  },
  {
    id: 'called', tint: '#fff4e2',
    problem: 'How can people find work that fits who they are?',
    scraps: ['strengths', 'values', 'career options', 'training', 'pay', 'next steps'],
    category: 'Career exploration', title: 'Called', status: 'Live',
    description: 'A free career-discovery experience connecting self-understanding, purpose, and practical next steps.',
    why: 'Choosing a direction can feel like choosing a lifetime in one decision. Students and career changers need room to explore what matters to them alongside the realities of work, training, and pay.',
    built: 'Called combines guided reflection with career information, comparisons, and ways to try possibilities. It helps people gather evidence about themselves and the paths they are considering.',
    value: 'The aim is to make career exploration more accessible and help people choose their next step with greater clarity and agency.',
    url: 'https://allcattlenobull.github.io/called/', linkText: 'Visit Called'
  },
  {
    id: 'acnb', tint: '#f4f2e8',
    problem: 'What if a small fund had an AI team to research, decide, and keep investors in the loop?',
    scraps: ['research', 'decisions', 'portfolio', 'operations', 'investor updates', 'documents'],
    category: 'Fund operations and investing', title: 'All Cattle No Bull', status: 'In development',
    description: 'An AI-assisted fund platform envisioned for small private funds, bringing investment workflows and the investor experience together.',
    why: 'Small fund teams must research opportunities, make and track decisions, manage operations, and communicate with investors. Doing that across disconnected tools creates work and makes it harder to keep a clear record.',
    built: 'The platform brings structured research, portfolio monitoring, and AI-assisted fund workflows into one system. An earlier version also includes an investor portal for sharing fund information and documents. The current v2 demo focuses on an AI-managed paper-trading fund; its investor portal is part of the broader platform vision.',
    value: 'The vision is to give small fund teams a more coherent way to run their work and give investors a dedicated place to stay informed.',
    url: 'https://allcattlenobull.com/', linkText: 'Visit All Cattle No Bull'
  },
  {
    id: 'him', tint: '#ffeded',
    problem: 'What if your fantasy football league had a home worthy of its stories?',
    scraps: ['league history', 'trades', 'drafts', 'rivalries', 'player analysis', 'group chats'],
    category: 'Sports and data', title: 'The Edge', status: 'Live',
    description: 'A fantasy football platform that gives leagues a home for their history, tools, and shared moments.',
    why: 'A league is more than a weekly score. Trades, rivalries, drafts, and seasons build a shared history that can get lost across apps, chats, and spreadsheets.',
    built: 'The Edge brings league sites, draft rooms, trade tools, player analysis, and league history together around the communities that use them.',
    value: 'It gives commissioners and managers a richer way to make decisions, revisit their history, and enjoy the game together.',
    url: 'https://theedge.football/', linkText: 'Visit The Edge'
  },
  {
    id: 'me', tint: '#ffffff',
    problem: 'Who keeps asking these questions?',
    category: 'The person behind the screens', title: 'Prince Saah',
    description: 'I look for the problems people quietly put up with, then build practical tools around them.',
    detail: 'AI is a collaborator in the work. People stay in charge of the decisions.',
    url: CONTACT_LINK, linkText: 'Email Prince'
  }
];

const $ = s => document.querySelector(s);
const voidEl = $('.void');
const dotsEl = $('.dots');
const portal = $('.portal');
const sol = $('.sol');
const closeBtn = $('.close');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const DUR = reduce ? 0 : 850;

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

// Captured from the actual projects in November 2026. Private figures are concealed.
const PROJECT_SCREENS = {
  hiring: [
    { label: 'Role intake · pilot demo', src: 'assets/screens/umn-intake.png' },
    { label: 'Job classification · pilot demo', src: 'assets/screens/umn-classification.png' }
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
    h('p', { className: 'real-views-kicker' }, 'INSIDE THE PROJECT'),
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
    h('p', { className: 'real-views-kicker' }, 'ACTUAL PROJECT VIEWS'),
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

// The story is told without headings: the mess, the build, the difference.
let storyObserver, valueTimer;

function buildProjectStory(p) {
  if (!p.why) return null;
  const rnd = (a, b) => a + Math.random() * (b - a);
  const tray = h('div', { className: 'tray', 'aria-hidden': 'true' },
    h('div', { className: 'tray-bar' }, h('i'), h('i'), h('i'), h('span', {}, p.title)),
    h('div', { className: 'tray-grid' },
      ...p.scraps.map((t, i) => h('span', {
        className: 'scrap',
        style: `--x:${rnd(-70, 70).toFixed(0)}px;--y:${rnd(-60, 60).toFixed(0)}px;--r:${rnd(-16, 16).toFixed(1)}deg;--i:${i}`
      }, t))
    )
  );
  const typed = h('span', { className: 'typed', 'aria-hidden': 'true' });
  const value = h('p', { className: 'story-value' },
    h('span', { className: 'sr-only' }, p.value), typed, h('span', { className: 'caret', 'aria-hidden': 'true' }));
  value._typed = typed; value._text = p.value;

  return h('section', { className: 'project-story', style: '--d:5', 'aria-label': 'Project story' },
    h('p', { className: 'story-why' }, p.why),
    tray,
    h('p', { className: 'story-built' }, p.built),
    value
  );
}

function typeValue(el) {
  if (el._done) return;
  el._done = true;
  const text = el._text;
  if (reduce) { el._typed.textContent = text; el.classList.add('done'); return; }
  let n = 0;
  const step = () => {
    el._typed.textContent = text.slice(0, ++n);
    if (n < text.length) valueTimer = setTimeout(step, 14 + Math.random() * 26 + (text[n - 1] === ',' ? 140 : 0));
    else el.classList.add('done');
  };
  step();
}

function watchStory() {
  if (storyObserver) storyObserver.disconnect();
  clearTimeout(valueTimer);
  storyObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      if (e.target.classList.contains('tray')) e.target.classList.add('sorted');
      if (e.target.classList.contains('story-value')) typeValue(e.target);
      storyObserver.unobserve(e.target);
    });
  }, { root: sol, rootMargin: '0px 0px -30% 0px', threshold: .6 });
  sol.querySelectorAll('.tray, .story-value').forEach(el => storyObserver.observe(el));
}

/* ---------- Build the desks ---------- */
const pcs = projects.map((p, i) => {
  const ink = h('span', { className: 'txt' });
  const pc = h('button', {
    className: 'pc', type: 'button',
    style: `--tint:${p.tint}`,
    'aria-label': `${p.problem} Step inside for the solution.`
  },
    h('span', { className: 'pool', 'aria-hidden': 'true' }),
    h('span', { className: 'monitor', 'aria-hidden': 'true' },
      h('span', { className: 'bezel' },
        h('span', { className: 'screen' },
          h('span', { className: 'light' }),
          h('span', { className: 'ink' }, ink, h('span', { className: 'caret' }))
        )
      ),
      h('span', { className: 'neck' }),
      h('span', { className: 'foot' })
    )
  );
  pc._ink = ink;
  pc.addEventListener('click', () => {
    if (suppressClick) return;
    i === active ? open(i) : go(i);
  });
  voidEl.append(pc);
  return pc;
});

const dots = projects.map((p, i) => {
  const d = h('button', { className: 'dot', type: 'button', 'aria-label': `Problem ${i + 1} of ${projects.length}` });
  d.addEventListener('click', () => go(i));
  dotsEl.append(d);
  return d;
});

/* ---------- Moving between desks ---------- */
let active = 0;
let typing;

function layout(drag = 0) {
  pcs.forEach((el, i) => {
    const o = i - active + drag;
    el.style.setProperty('--o', o);
    el.style.setProperty('--a', Math.abs(o));
    el.style.zIndex = 100 - Math.round(Math.abs(o) * 10);
    el.tabIndex = i === active ? 0 : -1;
  });
}

function power(i) {
  pcs.forEach((el, j) => {
    if (j === i) { el.classList.remove('off'); el.classList.add('on'); }
    else if (el.classList.contains('on')) { el.classList.remove('on'); el.classList.add('off'); }
  });
  dots.forEach((d, j) => d.setAttribute('aria-current', j === i));
  document.documentElement.style.setProperty('--tint', projects[i].tint);
  type(i);
}

function type(i) {
  clearTimeout(typing);
  const ink = pcs[i]._ink;
  const text = projects[i].problem;
  if (reduce) { ink.textContent = text; return; }
  ink.textContent = '';
  let n = 0;
  const step = () => {
    ink.textContent = text.slice(0, ++n);
    if (n < text.length) {
      const ch = text[n - 1];
      typing = setTimeout(step, 32 + Math.random() * 55 + (ch === ' ' ? 45 : 0) + (ch === ',' ? 160 : 0));
    }
  };
  typing = setTimeout(step, 700);
}

function go(i, focus = true) {
  i = Math.max(0, Math.min(projects.length - 1, i));
  if (i === active) { layout(); return; }
  active = i;
  layout();
  power(i);
  if (focus && document.activeElement && document.activeElement.classList.contains('pc')) {
    pcs[i].focus({ preventScroll: true });
  }
}

/* ---------- Stepping inside a screen ---------- */
let openIndex = -1;
let pushed = false;

function fill(p) {
  const screens = buildProjectScreens(p.id);
  const views = buildProjectViews(p.id);
  const story = buildProjectStory(p);
  sol.replaceChildren(...[
    h('div', { className: 'sol-q-wrap', style: '--d:0' }, h('p', { className: 'sol-q' }, p.problem)),
    h('p', { className: 'sol-kicker', style: '--d:2' },
      h('span', {}, p.category.toUpperCase()),
      p.status ? h('span', { className: 'tag' }, p.status.toUpperCase()) : null
    ),
    h('h2', { id: 'sol-title', style: '--d:3' }, p.title),
    h('p', { className: 'sol-lead', style: '--d:4' }, p.description),
    p.detail ? h('p', { className: 'sol-detail', style: '--d:5' }, p.detail) : null,
    story,
    screens,
    views,
    p.url ? h('div', { style: '--d:6' },
      h('a', p.url.startsWith('mailto:')
        ? { className: 'sol-link', href: p.url }
        : { className: 'sol-link', href: p.url, target: '_blank', rel: 'noopener noreferrer' }, p.linkText)) : null,
    h('div', { className: 'sol-foot', style: '--d:7' },
      h('span', {}, 'PRINCE SAAH'),
      p.id === 'me' ? null : h('a', { href: CONTACT_LINK }, 'EMAIL PRINCE')
    )
  ].filter(Boolean));
  sol.scrollTop = 0;
  watchStory();
}

function screenOf(i) { return pcs[i].querySelector('.screen'); }

function place(r, radius) {
  Object.assign(portal.style, {
    left: r.left + 'px', top: r.top + 'px',
    width: r.width + 'px', height: r.height + 'px',
    borderRadius: radius
  });
}
const full = () => ({ left: 0, top: 0, width: innerWidth, height: innerHeight });

function open(i) {
  if (openIndex >= 0) return;
  openIndex = i;
  const p = projects[i];
  fill(p);
  clearTimeout(typing);
  pcs[i]._ink.textContent = p.problem;

  const screen = screenOf(i);
  const r = screen.getBoundingClientRect();
  portal.style.setProperty('--tint', p.tint);
  portal.style.transition = 'none';
  place(r, getComputedStyle(screen).borderRadius);
  portal.classList.add('show');
  portal.offsetWidth;
  portal.style.transition = '';

  voidEl.style.transformOrigin = `${r.left + r.width / 2}px ${r.top + r.height / 2}px`;
  voidEl.classList.add('dive');
  dotsEl.style.opacity = 0;
  requestAnimationFrame(() => place(full(), '0px'));

  setTimeout(() => {
    Object.assign(portal.style, { left: '0', top: '0', width: '100%', height: '100%' });
    portal.classList.add('open');
    sol.focus({ preventScroll: true });
  }, DUR * .8);

  if (location.hash !== '#' + p.id) { history.pushState({ id: p.id }, '', '#' + p.id); pushed = true; }
}

function close() {
  if (openIndex < 0) return;
  const i = openIndex;
  portal.classList.remove('open');

  setTimeout(() => {
    // measure where the screen sits when we are standing back in the void
    voidEl.style.transition = 'none';
    voidEl.classList.remove('dive');
    const screen = screenOf(i);
    const r = screen.getBoundingClientRect();
    voidEl.classList.add('dive');
    voidEl.offsetWidth;
    voidEl.style.transition = '';

    portal.style.transition = 'none';
    place(full(), '0px');
    portal.offsetWidth;
    portal.style.transition = '';
    place(r, getComputedStyle(screen).borderRadius);
    voidEl.classList.remove('dive');
    dotsEl.style.opacity = '';

    setTimeout(() => {
      portal.classList.remove('show');
      openIndex = -1;
      sol.replaceChildren();
      pcs[active].focus({ preventScroll: true });
    }, DUR);
  }, reduce ? 0 : 220);
}

function requestClose() {
  if (pushed) { pushed = false; history.back(); }
  else { history.replaceState(null, '', location.pathname + location.search); close(); }
}

closeBtn.addEventListener('click', requestClose);

addEventListener('popstate', () => {
  const i = projects.findIndex(p => '#' + p.id === location.hash);
  if (i < 0) { pushed = false; close(); return; }
  if (openIndex >= 0) return;
  go(i, false);
  setTimeout(() => open(i), DUR);
});

/* ---------- Input ---------- */
addEventListener('keydown', e => {
  if (openIndex >= 0) {
    if (e.key === 'Escape') { e.preventDefault(); requestClose(); }
    if (e.key === 'Tab') {               // keep focus inside the solution
      const f = [...portal.querySelectorAll('a, button, iframe')];
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === sol)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    return;
  }
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); go(active + 1); }
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); go(active - 1); }
});

let wheelAcc = 0, wheelLock = 0;
addEventListener('wheel', e => {
  if (openIndex >= 0) return;
  e.preventDefault();
  const now = Date.now();
  if (now < wheelLock) { wheelAcc = 0; return; }
  wheelAcc += Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
  if (Math.abs(wheelAcc) > 30) {
    go(active + Math.sign(wheelAcc));
    wheelAcc = 0;
    wheelLock = now + 700;
  }
}, { passive: false });

let startX = null, dx = 0, dragging = false, suppressClick = false;
const gapPx = () => Math.min(innerWidth * .72, 760);

voidEl.addEventListener('pointerdown', e => {
  if (openIndex >= 0 || e.button > 0) return;
  startX = e.clientX; dx = 0; dragging = false;
});
addEventListener('pointermove', e => {
  if (startX === null) return;
  dx = e.clientX - startX;
  if (!dragging && Math.abs(dx) > 8) { dragging = true; voidEl.classList.add('dragging'); }
  if (dragging) {
    let d = dx / gapPx();
    if ((active === 0 && d > 0) || (active === projects.length - 1 && d < 0)) d *= .25;
    layout(d);
  }
});
function endDrag() {
  if (startX === null) return;
  startX = null;
  if (!dragging) return;
  voidEl.classList.remove('dragging');
  suppressClick = true;
  setTimeout(() => { suppressClick = false; }, 0);
  const t = gapPx() * .14;
  if (dx < -t) go(active + 1); else if (dx > t) go(active - 1); else layout();
  dragging = false;
}
addEventListener('pointerup', endDrag);
addEventListener('pointercancel', () => { dx = 0; endDrag(); });

/* ---------- Lights on ---------- */
layout();
const startAt = Math.max(0, projects.findIndex(p => '#' + p.id === location.hash));
if (startAt) { active = startAt; layout(); }
setTimeout(() => {
  power(active);
  if (location.hash && projects[startAt] && '#' + projects[startAt].id === location.hash) {
    setTimeout(() => open(startAt), reduce ? 0 : 1100);
  }
}, reduce ? 0 : 600);
