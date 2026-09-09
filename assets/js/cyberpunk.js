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
    
    // Strip YAML Front Matter if present
    md = md.replace(/^---[\s\S]*?---\s*/, '');

    // Escape HTML
    let html = md
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

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
      modalPath.textContent = `// ${filePath}`;
      modalBody.innerHTML = `
        <div style="font-family: var(--font-mono); color: var(--neon-cyan); padding: 2rem; text-align: center;">
          <div class="pulse-dot" style="display:inline-block; margin-right: 0.5rem;"></div>
          ACCESSING PROTOCOL FILE: ${filePath}...
        </div>
      `;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';

      if (rawLink) {
        rawLink.href = filePath;
      }

      try {
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        currentMarkdown = await response.text();
        modalBody.innerHTML = `<div class="markdown-body">${parseMarkdown(currentMarkdown)}</div>`;
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
        nav.classList.toggle('mobile-active');
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
    initControls();
  });
})();

