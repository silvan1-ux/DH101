/**
 * DH101 — Editorial & Brutalist Minimalist Engine
 * Digital Humanities 101 // Critical Making in the Age of AI
 */

(function () {
  'use strict';

  // --- Theme Manager (Day / Night Mode) ---
  const THEME_KEY = 'dh101_theme';

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);

    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach(btn => {
      const isLight = theme === 'light';
      btn.setAttribute('aria-checked', isLight ? 'true' : 'false');
      btn.setAttribute('aria-label', isLight ? 'Ativar modo escuro' : 'Ativar modo claro');
      const textEl = btn.querySelector('.theme-label');
      if (textEl) {
        textEl.textContent = isLight ? 'LIGHT' : 'DARK';
      }
    });
  }

  function initThemeToggle() {
    // Initial sync with UI
    const currentTheme = document.documentElement.getAttribute('data-theme') || getPreferredTheme();
    applyTheme(currentTheme);

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.theme-toggle-btn');
      if (!btn) return;
      const active = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = active === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });

    // Listen for OS system theme changes if user hasn't explicitly set preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(THEME_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // --- Subtle Custom Cursor (Desktop Only) ---
  function initCustomCursor() {
    // Respect reduced motion & touch-only devices
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';

    document.body.appendChild(dot);
    document.body.appendChild(ring);
    document.body.classList.add('has-custom-cursor');

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });

    function renderRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      requestAnimationFrame(renderRing);
    }
    requestAnimationFrame(renderRing);

    // Hover states on interactive elements
    const hoverTargets = 'a, button, input, .editorial-card, .filter-pill, .theme-toggle-btn';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(hoverTargets)) {
        ring.classList.add('cursor-hover');
      }
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(hoverTargets)) {
        ring.classList.remove('cursor-hover');
      }
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    });
  }

  // --- Scroll Reveals (IntersectionObserver) ---
  function initScrollReveals() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const revealItems = document.querySelectorAll('.editorial-card, .section-lead-row, .hero-lead, .stat-item');
    if (!revealItems.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    revealItems.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      observer.observe(el);
    });
  }

  // --- Lightweight Client-Side Markdown Parser ---
  function parseMarkdown(md) {
    if (!md) return '';

    // Strip YAML front matter
    md = md.replace(/^---[\s\S]*?---\s*/, '');

    // Escape basic HTML
    let html = md
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Fenced Code blocks
    html = html.replace(/```([a-z]*)\n([\s\S]*?)```/g, function (match, lang, code) {
      return `<pre><code class="language-${lang}">${code.trim()}</code></pre>`;
    });

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Headings
    html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Blockquotes
    html = html.replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>');

    // Bold & Italic
    html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Task lists
    html = html.replace(/^- \[x\] (.*$)/gim, '<li class="task-item checked">[✓] $1</li>');
    html = html.replace(/^- \[ \] (.*$)/gim, '<li class="task-item">[ ] $1</li>');

    // Lists
    html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/gim, '<ul>$1</ul>');
    html = html.replace(/<\/ul>\s*<ul>/g, '');

    // Links & Images
    html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2" />');
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

    // Paragraphs
    const blocks = html.split(/\n{2,}/);
    html = blocks.map(block => {
      block = block.trim();
      if (!block) return '';
      if (block.startsWith('<h') || block.startsWith('<pre') || block.startsWith('<ul') || block.startsWith('<blockquote')) {
        return block;
      }
      return `<p>${block.replace(/\n/g, '<br/>')}</p>`;
    }).join('\n');

    return html;
  }

  // --- Reading Modal / Drawer Engine ---
  function initModalReader() {
    const modal = document.getElementById('editorial-modal');
    if (!modal) return;

    const modalBody = document.getElementById('modal-body-content');
    const modalHeading = document.getElementById('modal-doc-title');
    const modalPath = document.getElementById('modal-doc-path');
    const copyBtn = document.getElementById('modal-copy-btn');
    const rawLink = document.getElementById('modal-raw-link');
    const closeBtn = document.getElementById('modal-close-btn');

    let currentMarkdown = '';

    window.openEditorialDoc = async function (filePath, title) {
      modalHeading.textContent = title || 'DOCUMENT VIEW';
      modalPath.textContent = filePath;
      modalBody.innerHTML = `
        <div style="font-family: 'Space Mono', monospace; font-size: 0.9rem; color: var(--text-muted); padding: 3rem 0; text-align: center;">
          Carregando documento: ${filePath}...
        </div>
      `;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';

      if (rawLink) {
        rawLink.href = filePath;
      }

      try {
        const res = await fetch(filePath);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        currentMarkdown = await res.text();
        modalBody.innerHTML = `<div class="markdown-body">${parseMarkdown(currentMarkdown)}</div>`;
      } catch (err) {
        modalBody.innerHTML = `
          <div style="font-family: 'Space Mono', monospace; padding: 2rem 0;">
            <p style="color: #ef4444; margin-bottom: 1rem;">[ERRO] Não foi possível carregar o arquivo via protocolo (${err.message}).</p>
            <p><a href="${filePath}" target="_blank" class="editorial-btn">Abrir arquivo direto</a></p>
          </div>
        `;
      }
    };

    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });

    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        if (!currentMarkdown) return;
        navigator.clipboard.writeText(currentMarkdown).then(() => {
          const prev = copyBtn.textContent;
          copyBtn.textContent = 'COPIADO';
          setTimeout(() => {
            copyBtn.textContent = prev;
          }, 2000);
        });
      });
    }
  }

  // --- Filtering & Search ---
  function initFiltering() {
    const searchInput = document.getElementById('editorial-search');
    const filterBtns = document.querySelectorAll('.filter-pill');
    const cards = document.querySelectorAll('.editorial-card[data-category]');

    let activeCategory = 'all';
    let query = '';

    function applyFilters() {
      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        const text = card.textContent.toLowerCase();

        const matchCat = activeCategory === 'all' || cat === activeCategory;
        const matchSearch = !query || text.includes(query);

        if (matchCat && matchSearch) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.getAttribute('data-filter');
        applyFilters();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        query = e.target.value.toLowerCase().trim();
        applyFilters();
      });
    }
  }

  // --- Mobile Menu Toggle ---
  function initMobileMenu() {
    const toggleBtn = document.querySelector('.mobile-toggle-btn');
    const nav = document.querySelector('.nav-menu');
    if (toggleBtn && nav) {
      toggleBtn.addEventListener('click', () => {
        nav.classList.toggle('mobile-open');
        const isOpen = nav.classList.contains('mobile-open');
        toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });

      // Close menu when clicking nav link
      nav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          nav.classList.remove('mobile-open');
        });
      });
    }
  }

  // --- Initialization ---
  document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initCustomCursor();
    initScrollReveals();
    initModalReader();
    initFiltering();
    initMobileMenu();
  });
})();

