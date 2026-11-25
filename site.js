// Shared behaviour for the pages around the portfolio: the menu and the typing screen.
{
  const head = document.querySelector('.site-head');
  const menu = head && head.querySelector('.menu-btn');
  if (menu) {
    const set = open => {
      head.classList.toggle('open', open);
      menu.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    };
    menu.addEventListener('click', () => set(!head.classList.contains('open')));
    head.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => set(false)));
    addEventListener('keydown', e => { if (e.key === 'Escape') set(false); });
  }

  const q = document.querySelector('.screen-q');
  if (q) {
    const text = q.textContent.trim();
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const typed = document.createElement('span');
    const caret = document.createElement('span');
    typed.setAttribute('aria-hidden', 'true');
    caret.className = 'caret';
    caret.setAttribute('aria-hidden', 'true');
    q.setAttribute('aria-label', text);
    const ghost = document.createElement('span');   // reserves the final size so nothing jumps
    const live = document.createElement('span');
    ghost.className = 'ghost'; ghost.textContent = text; ghost.setAttribute('aria-hidden', 'true');
    live.className = 'live';
    live.append(typed, caret);
    q.replaceChildren(ghost, live);
    if (reduce) typed.textContent = text;
    else {
      let n = 0;
      const step = () => {
        typed.textContent = text.slice(0, ++n);
        if (n < text.length) setTimeout(step, 34 + Math.random() * 55 + (text[n - 1] === ' ' ? 40 : 0));
      };
      setTimeout(step, 950);
    }
  }
}
