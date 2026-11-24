const projects = {
  hiring: {
    category: 'PEOPLE AND HIRING', title: 'UMN Talent Workspace', status: 'LOCAL PROTOTYPE',
    question: 'How can we make hiring less overwhelming?',
    description: 'An AI-assisted hiring workspace designed around the University of Minnesota’s hiring process. The local demo explores support for job design, classification, compensation, and search planning.',
    detail: 'The concept keeps people in control: the AI assists with drafting and recommendations while hiring professionals retain the decisions.'
  },
  mwana: {
    category: 'SMALL BUSINESS OPERATIONS', title: 'Mwana Therapy', status: 'DEPLOYED',
    question: 'How can a small practice keep its business organized?',
    description: 'A practical administrative workspace for a small therapy practice, bringing transactions, linked accounting records, and a general ledger into one place.',
    detail: 'Built and refined with AI assistance around the day-to-day needs of the practice.'
  },
  called: {
    category: 'CAREER EXPLORATION', title: 'Called', status: 'PUBLIC EXPERIENCE',
    question: 'How do you find a career that fits?',
    description: 'A career-discovery experience that helps people explore their strengths, consider possibilities, and make more informed decisions about what comes next.',
    detail: 'The goal is to help people explore their options and make their own choices.',
    url: 'https://allcattlenobull.github.io/called/', linkText: 'Visit Called'
  },
  acnb: {
    category: 'INVESTMENT RESEARCH', title: 'All Cattle No Bull', status: 'ONGOING',
    question: 'How can research lead to clearer decisions?',
    description: 'An independent portfolio management platform combining structured market analysis, research workflows, and AI-assisted decision support.',
    detail: 'A place to bring research, data, and a disciplined decision process together.'
  },
  him: {
    category: 'SPORTS AND DATA', title: 'HIM Dynasty', status: 'PUBLIC EXPERIENCE',
    question: 'What if a league had its own home for data and stories?',
    description: 'A fantasy football league experience bringing standings, league history, trade tools, and player analysis together.',
    detail: 'Designed to give a community a more engaging way to explore its league.',
    url: 'https://allcattlenobull.github.io/himdynasty/', linkText: 'Explore HIM Dynasty'
  }
};

const dialog = document.querySelector('.case-dialog');
const closeButton = dialog.querySelector('.close');
const link = document.querySelector('#case-link');
let lastTrigger = null;

document.querySelectorAll('.computer').forEach(button => {
  button.addEventListener('click', () => {
    const project = projects[button.dataset.project];
    if (!project) return;
    lastTrigger = button;
    document.querySelector('#case-category').textContent = project.category;
    document.querySelector('#case-title').textContent = project.title;
    document.querySelector('#case-status').textContent = project.status;
    document.querySelector('#case-question').textContent = project.question;
    document.querySelector('#case-description').textContent = project.description;
    document.querySelector('#case-detail').textContent = project.detail;
    link.hidden = !project.url;
    if (project.url) { link.href = project.url; link.textContent = project.linkText; }
    else { link.removeAttribute('href'); link.textContent = ''; }
    dialog.showModal();
    closeButton.focus();
  });
});
closeButton.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => { if (lastTrigger) lastTrigger.focus(); });
