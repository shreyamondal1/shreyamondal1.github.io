(async () => {
  let data;
  try {
    const response = await fetch('./data.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    data = await response.json();
  } catch (error) {
    console.error('Could not load portfolio data:', error);
    document.body.innerHTML = '<p style="padding:2rem">Portfolio data could not be loaded. Run this site through a local web server (such as VS Code Live Server) and check that data.json is beside index.html.</p>';
    return;
  }
  const $ = (selector) => document.querySelector(selector);
  const esc = (value = '') => String(value).replace(/[&<>"']/g, (c) => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
  }[c]));
  const external = (url) => /^https?:\/\//i.test(url || '');
  const tagList = (items) => (items || []).map(x => `<span class="tag">${esc(x)}</span>`).join('');

  const s = data.site;
  $('#hero-content').innerHTML = `
    <p class="eyebrow">${esc(s.eyebrow)}</p>
    <h1>${esc(s.headline)}<span class="name-period">.</span></h1>
    <p class="hero-focus">${esc(s.focus)}</p>
    <p class="hero-copy">${esc(s.introduction)}</p>
    <div class="hero-actions">
      <div class="contact-icons" aria-label="Social and contact links">
        ${s.social.map(item => `
          <a class="contact-icon"
             href="${esc(item.url)}"
             ${external(item.url) ? 'target="_blank" rel="noopener noreferrer"' : ''}
             aria-label="${esc(item.label)}"
             title="${esc(item.label)}">
            ${item.label === 'GitHub' ? `
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.06c-3.1.67-3.76-1.32-3.76-1.32-.5-1.29-1.23-1.63-1.23-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.75 2.17 3.08 1.66.1-.72.39-1.2.7-1.48-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.67.12 2.95.71.78 1.14 1.77 1.14 2.99 0 4.29-2.61 5.23-5.1 5.51.4.35.75 1.02.75 2.06V22c0 .29.2.63.77.52A11.1 11.1 0 0 0 12 .9Z"/>
              </svg>
            ` : item.label === 'LinkedIn' ? `
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.46H4.96V9h2.97v9.46ZM6.45 7.71a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44Zm12.01 10.75h-2.97v-4.6c0-1.1-.02-2.52-1.54-2.52-1.54 0-1.78 1.2-1.78 2.44v4.68H9.2V9h2.85v1.29h.04c.4-.75 1.37-1.54 2.82-1.54 3.01 0 3.56 1.98 3.56 4.56v5.15Z"/>
              </svg>
            ` : `
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 5h18v14H3zM3 6l9 7 9-7" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>
              </svg>
            `}
          </a>
        `).join('')}
      </div>
    </div>`;

  $('#section-index').innerHTML = `<span class="nav-label">EXPLORE</span>` +
    data.navigation.map(item => `<a href="#${esc(item.id)}">${esc(item.label)} <span>↘</span></a>`).join('');

  $('#work-heading').innerHTML = `<div><p class="eyebrow section-kicker">01 / Selected work</p><h2>Projects & experiments</h2></div>
    <p class="section-intro">A selection of things I've built to explore data, modelling, workflows, and practical applications of technology.</p>`;
  $('#project-grid').innerHTML = data.projects.map(project => `
    <article class="project">
      <div class="project-top"><span class="project-index">${esc(project.index)}</span><span class="project-type">${esc(project.type)}</span></div>
      <h3>${esc(project.title)}</h3><p>${esc(project.description)}</p>
      <div class="tags">${tagList(project.tags)}</div>
      ${external(project.url) ? `<a class="project-link" href="${esc(project.url)}" target="_blank" rel="noopener noreferrer">${esc(project.link_label || 'View project')} <span>↗</span></a>` : ''}
    </article>`).join('');

  $('#approach-heading').innerHTML = `<div><p class="eyebrow section-kicker">02 / Capabilities</p><h2>How I approach problems</h2></div>
    <p class="section-intro">${esc(data.capabilities.intro)}</p>`;
  $('#capabilities-grid').innerHTML = data.capabilities.items.map(item => `
    <article class="capability"><div class="num">${esc(item.number)}</div><h3>${esc(item.title)}</h3><p>${esc(item.description)}</p></article>`).join('');

  $('#background-heading').innerHTML = `<div><p class="eyebrow section-kicker">03 / Background</p><h2>A little context</h2></div>
    <p class="section-intro">${esc(data.background.intro)}</p>`;
  $('#timeline').innerHTML = data.background.education_experience.map(item => `
    <div class="timeline-item"><span class="timeline-date">${esc(item.date)}</span><div><h3>${esc(item.title)}</h3><p>${esc(item.detail)}</p></div></div>`).join('');
  $('#skills-list').innerHTML = data.background.skills.map(skill => `<span class="skill">${esc(skill)}</span>`).join('');

  $('#contact-panel').innerHTML = `<div><p class="eyebrow">04 / Contact</p><h2>${esc(s.contact_heading)}</h2><p>${esc(s.contact_copy)}</p></div>
    <a class="btn" href="mailto:${esc(s.contact_email)}">Get in touch ↗</a>`;
  $('#footer-links').innerHTML = s.social
  .filter(x => x.label !== 'Email')
  .map(x => `
    <a class="footer-social"
       href="${esc(x.url)}"
       target="_blank"
       rel="noopener noreferrer"
       aria-label="${esc(x.label)}"
       title="${esc(x.label)}">
      ${x.label === 'GitHub' ? `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.06c-3.1.67-3.76-1.32-3.76-1.32-.5-1.29-1.23-1.63-1.23-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.75 2.17 3.08 1.66.1-.72.39-1.2.7-1.48-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.67.12 2.95.71.78 1.14 1.77 1.14 2.99 0 4.29-2.61 5.23-5.1 5.51.4.35.75 1.02.75 2.06V22c0 .29.2.63.77.52A11.1 11.1 0 0 0 12 .9Z"/>
        </svg>
      ` : `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.46H4.96V9h2.97v9.46ZM6.45 7.71a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44Zm12.01 10.75h-2.97v-4.6c0-1.1-.02-2.52-1.54-2.52-1.54 0-1.78 1.2-1.78 2.44v4.68H9.2V9h2.85v1.29h.04c.4-.75 1.37-1.54 2.82-1.54 3.01 0 3.56 1.98 3.56 4.56v5.15Z"/>
        </svg>
      `}
    </a>
  `).join('');
  $('#year').textContent = new Date().getFullYear();

  const root = document.documentElement;
  const themeButton = $('#theme-toggle');
  function setTheme(theme) {
    root.dataset.theme = theme;
    themeButton.textContent = theme === 'dark' ? '☀' : '☾';
    themeButton.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    $('meta[name="theme-color"]').content = theme === 'dark' ? '#111613' : '#f7f7f4';
    try { localStorage.setItem('portfolio-theme', theme); } catch (_) {}
  }
  let initial = 'light';
  try { initial = localStorage.getItem('portfolio-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); } catch (_) {}
  setTheme(initial);
  themeButton.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));
})();
