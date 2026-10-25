/**
 * DH101 Cyberpunk Cyberdeck Terminal Engine
 * Digital Humanities 101 // Critical Making in the Age of AI
 */

(function () {
  'use strict';

  // --- Sound Effects Synthesizer (Web Audio API) ---
  class CyberAudio {
    constructor() {
      this.ctx = null;
      this.muted = localStorage.getItem('dh101_cyber_mute') === 'true';
    }

    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.ctx = new AudioContext();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    toggleMute() {
      this.muted = !this.muted;
      localStorage.setItem('dh101_cyber_mute', this.muted);
      if (!this.muted) {
        this.init();
        this.playChirp(600, 0.08);
      }
      return this.muted;
    }

    playTone(freq, type, duration, gainVal = 0.05) {
      if (this.muted || !this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        
        gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {
        // Ignore audio errors if audio context blocked
      }
    }

    playHover() {
      this.playTone(880, 'sine', 0.04, 0.02);
    }

    playClick() {
      this.playTone(1200, 'triangle', 0.08, 0.04);
    }

    playChirp(baseFreq = 440, duration = 0.1) {
      if (this.muted || !this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 2, this.ctx.currentTime + duration);

        gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {}
    }
  }

  const cyberAudio = new CyberAudio();

  // --- Background Cyber Canvas Particles ---
  function initCyberCanvas() {
    const canvas = document.getElementById('cyber-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width, height;
    let particles = [];
    const particleCount = 45;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
        color: Math.random() > 0.6 ? 'rgba(0, 240, 255,' : (Math.random() > 0.5 ? 'rgba(255, 0, 85,' : 'rgba(0, 255, 102,')
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.12 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `${p.color} 0.5)`;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });

      requestAnimationFrame(animate);
    }

    // Only run animation if user doesn't prefer reduced motion
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      animate();
    }
  }

  // --- Real-time Stardate / HUD Clock ---
  function initClock() {
    const clockEl = document.getElementById('hud-clock');
    if (!clockEl) return;

    function update() {
      const now = new Date();
      const year = now.getUTCFullYear();
      const month = String(now.getUTCMonth() + 1).padStart(2, '0');
      const day = String(now.getUTCDate()).padStart(2, '0');
      const hours = String(now.getUTCHours()).padStart(2, '0');
      const minutes = String(now.getUTCMinutes()).padStart(2, '0');
      const seconds = String(now.getUTCSeconds()).padStart(2, '0');
      clockEl.textContent = `${year}.${month}.${day} // ${hours}:${minutes}:${seconds} UTC`;
    }

    update();
    setInterval(update, 1000);
  }

  // --- Lightweight Client-Side Markdown Parser ---
  function parseMarkdown(md) {
    if (!md) return '';
    
    // Preserve raw embedded media blocks such as PDF objects so they render correctly
    const preservedBlocks = [];
    md = md.replace(/<object\b[^>]*>[\s\S]*?<\/object>/gi, (match) => {
      const placeholder = `__PRESERVED_BLOCK_${preservedBlocks.length}__`;
      preservedBlocks.push(match);
      return placeholder;
    });

    // Strip YAML Front Matter if present
    md = md.replace(/^---[\s\S]*?---\s*/, '');

    // Escape HTML
    let html = md
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Restore native embedded media blocks before other parser rules
    html = html.replace(/__PRESERVED_BLOCK_(\d+)__/g, (_, index) => preservedBlocks[Number(index)]);

    // Code blocks with syntax framing
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

    // Blockquotes (e.g. Markdown help or prompts)
    html = html.replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>');

    // Bold & Italic
    html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Task lists
    html = html.replace(/^- \[x\] (.*$)/gim, '<li class="task-item checked"><span class="task-box">[X]</span> $1</li>');
    html = html.replace(/^- \[ \] (.*$)/gim, '<li class="task-item"><span class="task-box">[ ]</span> $1</li>');

    // Unordered lists
    html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/gim, '<ul>$1</ul>');
    // Fix consecutive ul tags
    html = html.replace(/<\/ul>\s*<ul>/g, '');

    // Links & Images
    html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2" />');
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

    // Paragraphs
    const lines = html.split(/\n{2,}/);
    html = lines.map(line => {
      line = line.trim();
      if (line.startsWith('<h') || line.startsWith('<pre') || line.startsWith('<ul') || line.startsWith('<blockquote')) {
        return line;
      }
      return `<p>${line.replace(/\n/g, '<br/>')}</p>`;
    }).join('\n');

    return html;
  }

  // --- Holographic Markdown Modal Reader ---
  function initModalReader() {
    const modal = document.getElementById('cyber-modal');
    if (!modal) return;

    const modalBody = document.getElementById('modal-body-content');
    const modalTitle = document.getElementById('modal-doc-title');
    const modalPath = document.getElementById('modal-doc-path');
    const copyBtn = document.getElementById('modal-copy-btn');
    const rawLink = document.getElementById('modal-raw-link');
    const closeBtn = document.getElementById('modal-close-btn');

    let currentMarkdown = '';

    window.openCyberDoc = async function (filePath, title) {
      cyberAudio.init();
      cyberAudio.playClick();

      modalTitle.textContent = title || 'DOCUMENT TERMINAL';
      const stylesheet = document.querySelector('link[rel="stylesheet"][href*="/assets/css/cyberpunk.css"]');
      const basePath = stylesheet ? new URL(stylesheet.href).pathname.replace(/\/assets\/css\/cyberpunk\.css$/, '') : '';
      const pagePath = filePath;
      const isRenderedPage = pagePath.endsWith('.html');
      const pageUrl = `${basePath}/${pagePath}`.replace(/\/+/g, '/');

      modalPath.textContent = `// ${pagePath}`;
      modalBody.innerHTML = `
        <div style="font-family: var(--font-mono); color: var(--neon-cyan); padding: 2rem; text-align: center;">
          <div class="pulse-dot" style="display:inline-block; margin-right: 0.5rem;"></div>
          ACCESSING PROTOCOL FILE: ${filePath}...
        </div>
      `;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';

      if (rawLink) {
        rawLink.href = pageUrl;
      }

      try {
        const response = await fetch(pageUrl);
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        if (isRenderedPage) {
          const pageDocument = new DOMParser().parseFromString(await response.text(), 'text/html');
          const pageContent = pageDocument.querySelector('.markdown-body');
          if (!pageContent) throw new Error('Rendered page content was not found');
          currentMarkdown = pageContent.innerText;
          modalBody.innerHTML = `<div class="markdown-body">${pageContent.innerHTML}</div>`;
        } else {
          currentMarkdown = await response.text();
          modalBody.innerHTML = `<div class="markdown-body">${parseMarkdown(currentMarkdown)}</div>`;
        }
        if (rawLink) rawLink.href = pageUrl;
        cyberAudio.playChirp(800, 0.05);
      } catch (err) {
        modalBody.innerHTML = `
          <div style="font-family: var(--font-mono); color: var(--neon-magenta); padding: 2rem;">
            <h3>[ERR // FILE_ACCESS_FAILED]</h3>
            <p>Could not stream file directly via protocol (${err.message}).</p>
            <p><a href="${filePath}" target="_blank" class="card-btn" style="margin-top: 1rem;">ACCESS DIRECT RAW FILE</a></p>
          </div>
        `;
      }
    };

    function closeModal() {
      cyberAudio.playClick();
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
          cyberAudio.playChirp(1000, 0.06);
          const originalText = copyBtn.textContent;
          copyBtn.textContent = 'COPIED!';
          setTimeout(() => {
            copyBtn.textContent = originalText;
          }, 2000);
        });
      });
    }
  }

  // --- Search & Category Filtering ---
  function initFiltering() {
    const searchInput = document.getElementById('deck-search');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.cyber-card[data-category]');

    let activeCategory = 'all';
    let searchQuery = '';

    function applyFilter() {
      cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        const cardText = card.textContent.toLowerCase();
        
        const matchesCategory = activeCategory === 'all' || cardCategory === activeCategory;
        const matchesSearch = !searchQuery || cardText.includes(searchQuery);

        if (matchesCategory && matchesSearch) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        cyberAudio.init();
        cyberAudio.playClick();
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.getAttribute('data-filter');
        applyFilter();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        applyFilter();
      });
    }
  }

  function initActivityIndex() {
    const searchInput = document.getElementById('activity-search');
    const cards = Array.from(document.querySelectorAll('[data-activity-card]'));
    const filterButtons = document.querySelectorAll('[data-activity-tag]');
    const resultCount = document.getElementById('activity-result-count');
    if (!cards.length) return;

    let activeTag = 'all';

    function applyFilters() {
      const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
      let visibleCount = 0;
      cards.forEach((card) => {
        const tags = (card.dataset.tags || '').toLowerCase().split('|');
        const text = `${card.dataset.search || ''} ${card.textContent}`.toLowerCase();
        const matchesTag = activeTag === 'all' || tags.includes(activeTag);
        const matchesQuery = !query || text.includes(query);
        card.hidden = !(matchesTag && matchesQuery);
        if (!card.hidden) visibleCount += 1;
      });
      if (resultCount) resultCount.textContent = `${visibleCount} of ${cards.length} course weeks shown.`;
    }

    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        activeTag = button.dataset.activityTag.toLowerCase();
        filterButtons.forEach((filterButton) => {
          const selected = filterButton === button;
          filterButton.classList.toggle('active', selected);
          filterButton.setAttribute('aria-pressed', String(selected));
        });
        applyFilters();
      });
    });

    if (searchInput) searchInput.addEventListener('input', applyFilters);
    applyFilters();
  }

  function initTextExplorer() {
    const explorer = document.querySelector('[data-text-explorer]');
    if (!explorer) return;

    const fileInput = explorer.querySelector('[data-explorer-file]');
    const textInput = explorer.querySelector('[data-explorer-text]');
    const analyzeButton = explorer.querySelector('[data-explorer-analyze]');
    const excludeStopwords = explorer.querySelector('[data-explorer-stopwords]');
    const status = explorer.querySelector('[data-explorer-status]');
    const results = explorer.querySelector('[data-explorer-results]');
    const tabs = Array.from(explorer.querySelectorAll('[data-explorer-tab]'));
    const stopwords = new Set('a an and are as at be been but by can could did do does for from had has have he her hers him his how i if in into is it its me my no not of on or our out she so than that the their them then there these they this those to too up us was we were what when where which who will with would you your'.split(' '));
    let tokens = [];
    let sourceText = '';
    let selectedTerm = '';

    function createElement(tagName, className, text) {
      const element = document.createElement(tagName);
      if (className) element.className = className;
      if (text !== undefined) element.textContent = text;
      return element;
    }

    function setActiveTab(tabName, moveFocus = false) {
      tabs.forEach((tab) => {
        const active = tab.dataset.explorerTab === tabName;
        tab.setAttribute('aria-selected', String(active));
        tab.tabIndex = active ? 0 : -1;
        explorer.querySelector(`[data-explorer-panel="${tab.dataset.explorerTab}"]`).hidden = !active;
        if (active && moveFocus) tab.focus();
      });
    }

    function analyze() {
      sourceText = textInput.value.trim();
      if (!sourceText) {
        status.textContent = 'Paste text or choose a plain-text file before analyzing.';
        results.hidden = true;
        return;
      }

      const matches = Array.from(sourceText.matchAll(/[\p{L}\p{N}][\p{L}\p{M}\p{N}'’\u2010-\u2015-]*/gu));
      tokens = matches.map((match, index) => ({
        text: match[0],
        normalized: match[0].toLocaleLowerCase(),
        start: match.index,
        end: match.index + match[0].length,
        index
      }));

      if (!tokens.length) {
        status.textContent = 'No words were found. Check the text and try again.';
        results.hidden = true;
        return;
      }

      const filteredTokens = tokens.filter((token) => !excludeStopwords.checked || !stopwords.has(token.normalized));
      const counts = new Map();
      filteredTokens.forEach((token) => counts.set(token.normalized, (counts.get(token.normalized) || 0) + 1));
      const terms = Array.from(counts, ([term, count]) => ({ term, count })).sort((a, b) => b.count - a.count || a.term.localeCompare(b.term)).slice(0, 50);
      selectedTerm = terms[0]?.term || '';
      results.hidden = false;
      status.textContent = `Analyzed locally: ${tokens.length} words, ${counts.size} distinct terms.`;
      explorer.querySelector('[data-explorer-summary]').textContent = `${tokens.length} words // ${counts.size} terms // ${sourceText.length} characters`;
      renderTerms(terms);
      renderCloud(terms);
      renderReader();
      renderSelectedTerm();
    }

    function selectTerm(term) {
      selectedTerm = term;
      renderSelectedTerm();
    }

    function renderCloud(terms) {
      const cloud = explorer.querySelector('[data-explorer-cloud]');
      cloud.replaceChildren();
      const highest = Math.max(1, ...terms.map((item) => item.count));
      terms.slice(0, 35).forEach(({ term, count }) => {
        const button = createElement('button', 'text-explorer-cloud-term', term);
        button.type = 'button';
        button.style.setProperty('--term-scale', String(1 + (count / highest) * 1.2));
        button.setAttribute('aria-label', `${term}, ${count} occurrences. Select for trends and contexts.`);
        button.addEventListener('click', () => selectTerm(term));
        cloud.append(button);
      });
      if (!terms.length) cloud.textContent = 'No terms remain with the current common-word setting.';
    }

    function renderTerms(terms) {
      const list = explorer.querySelector('[data-explorer-terms]');
      list.replaceChildren();
      const highest = Math.max(1, ...terms.map((item) => item.count));
      terms.forEach(({ term, count }) => {
        const item = createElement('li', 'text-explorer-term');
        const button = createElement('button', 'text-explorer-term-select', term);
        button.type = 'button';
        button.setAttribute('aria-label', `${term}, ${count} occurrences. Select for trends and contexts.`);
        button.addEventListener('click', () => selectTerm(term));
        const countLabel = createElement('span', 'text-explorer-count', String(count));
        countLabel.setAttribute('aria-label', `${count} occurrences`);
        const track = createElement('span', 'text-explorer-bar-track');
        track.setAttribute('aria-hidden', 'true');
        const bar = createElement('span', 'text-explorer-bar');
        bar.style.width = `${(count / highest) * 100}%`;
        track.append(bar);
        item.append(button, countLabel, track);
        list.append(item);
      });
    }

    function renderSelectedTerm() {
      const selectedLabel = explorer.querySelector('[data-explorer-selected-term]');
      const contextLabel = explorer.querySelector('[data-explorer-context-term]');
      selectedLabel.textContent = selectedTerm ? `Distribution of “${selectedTerm}” across 10 equal word-count segments.` : 'No terms to display.';
      contextLabel.textContent = selectedTerm ? `Passages containing “${selectedTerm}” (up to 20 results).` : 'No terms to display.';

      const selectedTokens = tokens.filter((token) => token.normalized === selectedTerm);
      const trends = explorer.querySelector('[data-explorer-trends]');
      trends.replaceChildren();
      const segmentCounts = Array(10).fill(0);
      selectedTokens.forEach((token) => {
        const segment = Math.min(9, Math.floor((token.index / tokens.length) * 10));
        segmentCounts[segment] += 1;
      });
      const maxSegment = Math.max(1, ...segmentCounts);
      segmentCounts.forEach((count, index) => {
        const item = createElement('li', 'text-explorer-trend');
        item.append(createElement('span', 'text-explorer-segment-label', `Part ${index + 1}`));
        const track = createElement('span', 'text-explorer-bar-track');
        track.setAttribute('aria-hidden', 'true');
        const bar = createElement('span', 'text-explorer-bar');
        bar.style.width = `${(count / maxSegment) * 100}%`;
        track.append(bar);
        item.append(track, createElement('span', 'text-explorer-count', String(count)));
        item.setAttribute('aria-label', `Part ${index + 1}: ${count} occurrences`);
        trends.append(item);
      });

      const contexts = explorer.querySelector('[data-explorer-contexts]');
      contexts.replaceChildren();
      selectedTokens.slice(0, 20).forEach((token) => {
        const item = createElement('li', 'text-explorer-context');
        const left = sourceText.slice(Math.max(0, token.start - 55), token.start);
        const right = sourceText.slice(token.end, Math.min(sourceText.length, token.end + 55));
        item.append(document.createTextNode(`${token.start > 55 ? '…' : ''}${left}`));
        item.append(createElement('mark', '', sourceText.slice(token.start, token.end)));
        item.append(document.createTextNode(`${right}${token.end + 55 < sourceText.length ? '…' : ''}`));
        contexts.append(item);
      });
      if (!selectedTokens.length) contexts.textContent = 'No occurrences found.';
    }

    function renderReader() {
      explorer.querySelector('[data-explorer-reader]').textContent = sourceText;
    }

    fileInput.addEventListener('change', async () => {
      const file = fileInput.files && fileInput.files[0];
      if (!file) return;
      if (!file.type.startsWith('text/') && !file.name.toLowerCase().endsWith('.txt')) {
        status.textContent = 'Please choose a plain-text .txt file.';
        fileInput.value = '';
        return;
      }
      textInput.value = await file.text();
      status.textContent = `${file.name} loaded. Choose Analyze text to explore it.`;
    });

    analyzeButton.addEventListener('click', analyze);
    excludeStopwords.addEventListener('change', () => {
      if (!results.hidden) analyze();
    });
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => setActiveTab(tab.dataset.explorerTab));
      tab.addEventListener('keydown', (event) => {
        let nextIndex = null;
        if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = tabs.length - 1;
        if (nextIndex === null) return;
        event.preventDefault();
        setActiveTab(tabs[nextIndex].dataset.explorerTab, true);
      });
    });
  }

  function initImageLightbox() {
    const dialog = document.getElementById('image-lightbox');
    if (!dialog || typeof dialog.showModal !== 'function') return;

    const image = dialog.querySelector('img');
    const closeButton = dialog.querySelector('.lightbox-close');
    const motionButton = dialog.querySelector('.lightbox-motion-toggle');
    let returnFocus = null;

    document.addEventListener('click', (event) => {
      const trigger = event.target.closest('.lightbox-trigger');
      if (!trigger) return;
      returnFocus = trigger;
      const activityImage = trigger.querySelector('img');
      image.src = activityImage ? activityImage.src : trigger.dataset.lightboxSrc;
      image.alt = trigger.dataset.lightboxAlt || '';
      const isAnimated = Boolean(trigger.dataset.animationSrc && trigger.dataset.animationPoster);
      motionButton.hidden = !isAnimated;
      if (isAnimated) {
        motionButton.dataset.animationSrc = trigger.dataset.animationSrc;
        motionButton.dataset.animationPoster = trigger.dataset.animationPoster;
        motionButton.dataset.animationTarget = image.id;
        const isPlaying = image.src === new URL(trigger.dataset.animationSrc, document.baseURI).href;
        motionButton.setAttribute('aria-pressed', String(isPlaying));
        motionButton.textContent = isPlaying ? 'Pause animation' : 'Play animation';
      }
      dialog.showModal();
      closeButton.focus();
    });

    closeButton.addEventListener('click', () => dialog.close());
    motionButton.addEventListener('click', () => toggleAnimation(motionButton));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && dialog.open) {
        event.preventDefault();
        dialog.close();
      }
    });
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener('close', () => {
      image.removeAttribute('src');
      motionButton.hidden = true;
      if (returnFocus) returnFocus.focus();
    });
  }

  function toggleAnimation(button) {
    const image = document.getElementById(button.dataset.animationTarget);
    if (!image) return;
    const isPlaying = button.getAttribute('aria-pressed') !== 'true';
    image.src = isPlaying ? button.dataset.animationSrc : button.dataset.animationPoster;
    button.setAttribute('aria-pressed', String(isPlaying));
    button.textContent = isPlaying ? 'Pause animation' : 'Play animation';
  }

  function initAnimatedMedia() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.querySelectorAll('.activity-motion-toggle').forEach((button) => {
      if (button.classList.contains('lightbox-motion-toggle')) return;
      const image = document.getElementById(button.dataset.animationTarget);
      if (!image) return;
      const isPlaying = !reducedMotion;
      image.src = isPlaying ? button.dataset.animationSrc : button.dataset.animationPoster;
      button.setAttribute('aria-pressed', String(isPlaying));
      button.textContent = isPlaying ? 'Pause animation' : 'Play animation';
      button.addEventListener('click', () => toggleAnimation(button));
    });
  }

  // --- CRT Scanlines & Sound Controls ---
  function initControls() {
    // Scanlines Toggle
    const scanlineBtn = document.getElementById('toggle-scanlines');
    const savedScanlines = localStorage.getItem('dh101_scanlines');
    if (savedScanlines === 'false') {
      document.body.classList.add('no-scanlines');
      if (scanlineBtn) scanlineBtn.classList.remove('active');
    } else {
      if (scanlineBtn) scanlineBtn.classList.add('active');
    }

    if (scanlineBtn) {
      scanlineBtn.addEventListener('click', () => {
        cyberAudio.init();
        cyberAudio.playClick();
        const isOff = document.body.classList.toggle('no-scanlines');
        scanlineBtn.classList.toggle('active', !isOff);
        localStorage.setItem('dh101_scanlines', !isOff);
      });
    }

    // Audio SFX Toggle
    const audioBtn = document.getElementById('toggle-audio');
    if (audioBtn) {
      if (!cyberAudio.muted) audioBtn.classList.add('active');
      audioBtn.addEventListener('click', () => {
        const isMuted = cyberAudio.toggleMute();
        audioBtn.classList.toggle('active', !isMuted);
        audioBtn.setAttribute('aria-label', isMuted ? 'Sound Muted' : 'Sound Active');
        const label = audioBtn.querySelector('.btn-label');
        if (label) label.textContent = isMuted ? 'AUDIO: OFF' : 'AUDIO: ON';
      });
    }

    // Mobile Navigation Toggle
    const mobileBtn = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.cyber-nav');
    if (mobileBtn && nav) {
      mobileBtn.addEventListener('click', () => {
        cyberAudio.init();
        cyberAudio.playClick();
        const isOpen = nav.classList.toggle('mobile-active');
        mobileBtn.setAttribute('aria-expanded', String(isOpen));
      });
      nav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          nav.classList.remove('mobile-active');
          mobileBtn.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // Interactive Hover Sounds
    document.querySelectorAll('.cyber-btn, .card-btn, .hud-btn, .nav-link').forEach(el => {
      el.addEventListener('mouseenter', () => cyberAudio.playHover());
    });
  }

  // --- Boot sequence ---
  document.addEventListener('DOMContentLoaded', () => {
    initCyberCanvas();
    initClock();
    initModalReader();
    initFiltering();
    initActivityIndex();
    initTextExplorer();
    initImageLightbox();
    initAnimatedMedia();
    initControls();
  });
})();

