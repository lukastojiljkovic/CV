/* ══════════════════════════════════════
   Portfolio – Luka D. Stojiljković
   Main JavaScript
   ══════════════════════════════════════ */

// ── Theme Toggle (Dark / Light / System) ──
(function initTheme() {
    var toggle = document.getElementById('themeToggle');
    var icon = document.getElementById('themeIcon');
    var label = document.getElementById('themeLabel');

    var sunPath = 'M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c12.8-6.4 12.8-24.6 0-31z';
    var moonPath = 'M283.2 512c78.5 0 150.7-35.6 198.8-96.6a16 16 0 0 0-12.7-26.2c-8.9.5-17.5.7-25.8.7C306 390 192 275.9 192 138.5c0-33.6 6.8-66.5 20.2-97.3a16 16 0 0 0-18-22.1C84.6 44.7 0 155.6 0 283.2 0 409.5 102.5 512 228.8 512h54.4z';
    var systemPath = 'M464 384H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h416c26.5 0 48 21.5 48 48v256c0 26.5-21.5 48-48 48zM128 448H16c-8.8 0-16 7.2-16 16v16c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16v-16c0-8.8-7.2-16-16-16H384l-32-32H160l-32 32z';

    // Cycle order: system -> dark -> light -> system ...
    var mode = localStorage.getItem('cv-theme') || 'system';

    function systemIsDark() {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    function applyMode(m) {
        mode = m;
        if (m === 'system') {
            localStorage.removeItem('cv-theme');
        } else {
            localStorage.setItem('cv-theme', m);
        }

        var isDark = (m === 'dark') || (m === 'system' && systemIsDark());

        if (isDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }

        updateUI();
    }

    function updateUI() {
        if (mode === 'dark') {
            icon.innerHTML = '<path d="' + sunPath + '"/>';
            label.textContent = 'Light';
            toggle.setAttribute('aria-label', 'Current theme: Dark. Switch to Light');
        } else if (mode === 'light') {
            icon.innerHTML = '<path d="' + systemPath + '"/>';
            label.textContent = 'System';
            toggle.setAttribute('aria-label', 'Current theme: Light. Switch to System');
        } else {
            icon.innerHTML = '<path d="' + moonPath + '"/>';
            label.textContent = 'Dark';
            toggle.setAttribute('aria-label', 'Current theme: System. Switch to Dark');
        }
    }

    // Cycle on click: system -> dark -> light -> system
    toggle.addEventListener('click', function () {
        if (mode === 'system') {
            applyMode('dark');
        } else if (mode === 'dark') {
            applyMode('light');
        } else {
            applyMode('system');
        }
    });

    // Listen for system theme changes (applies when in system mode)
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
            if (mode === 'system') applyMode('system');
        });
    }

    // Initialize
    applyMode(mode);
})();

// ── Mobile Contact Panel ──
(function initMobileContact() {
    const contactToggle = document.getElementById('contactToggle');
    const contactPanel = document.getElementById('mobileContactPanel');

    contactToggle.addEventListener('click', function () {
        const isOpen = contactPanel.classList.contains('open');
        if (isOpen) {
            contactPanel.classList.remove('open');
            contactToggle.classList.remove('active');
        } else {
            const topbarHeight = document.querySelector('.topbar').offsetHeight;
            contactPanel.style.top = topbarHeight + 'px';
            contactPanel.classList.add('open');
            contactToggle.classList.add('active');
        }
    });

    document.addEventListener('click', function (e) {
        if (!contactToggle.contains(e.target) && !contactPanel.contains(e.target)) {
            contactPanel.classList.remove('open');
            contactToggle.classList.remove('active');
        }
    });
})();

// ── Scroll Reveal ──
(function initScrollReveal() {
    document.body.classList.add('js-loaded');

    var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('.section, .profile-summary, .hero').forEach(function (el) {
        revealObserver.observe(el);
    });

    // Staggered project card reveal
    var cardObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var grid = entry.target.closest('.project-grid, .section');
                if (grid) {
                    var cards = grid.querySelectorAll('.project');
                    cards.forEach(function (card, i) {
                        setTimeout(function () { card.classList.add('card-revealed'); }, i * 80);
                    });
                } else {
                    entry.target.classList.add('card-revealed');
                }
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

    document.querySelectorAll('.project-grid, .section').forEach(function (container) {
        var firstProject = container.querySelector('.project');
        if (firstProject) cardObserver.observe(firstProject);
    });
})();

// ── Progress Tracker (scroll spy) ──
(function initProgressTracker() {
    var trackerItems = document.querySelectorAll('.tracker-item');
    var sectionMap = {
        'education':  ['education'],
        'experience': ['experience'],
        'projects':   ['student-projects', 'personal-projects'],
        'skills':     ['skills'],
        'additional': ['additional']
    };

    function updateTracker() {
        var scrollY = window.scrollY + window.innerHeight / 3;
        var activeKey = null;
        var closestDist = Infinity;

        for (var key in sectionMap) {
            var ids = sectionMap[key];
            for (var j = 0; j < ids.length; j++) {
                var el = document.getElementById(ids[j]);
                if (!el) continue;
                var top = el.getBoundingClientRect().top + window.scrollY;
                var dist = scrollY - top;
                if (dist >= 0 && dist < closestDist) {
                    closestDist = dist;
                    activeKey = key;
                }
            }
        }

        if (!activeKey) activeKey = 'education';

        trackerItems.forEach(function (item) {
            item.classList.toggle('active', item.dataset.section === activeKey);
        });
    }

    window.addEventListener('scroll', updateTracker, { passive: true });
    window.addEventListener('resize', updateTracker);
    updateTracker();

    trackerItems.forEach(function (item) {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            var href = item.getAttribute('href');
            var target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
})();

// ── Topbar Name: Scroll to Top ──
(function initScrollToTop() {
    var nameEl = document.getElementById('topbarName');
    if (nameEl) {
        nameEl.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
})();
