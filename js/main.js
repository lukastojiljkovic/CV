/* ═══════════════════════════════════════════════════════════
   L. STOJILJKOVIĆ // SYS_OPERATIVE
   Behaviour: theme cycle, scroll reveal, scroll-spy, anchors.
   ─────────────────────────────────────────────────────────── */

(() => {
    'use strict';

    // ──────────  T H E M E   C Y C L E  ──────────
    // Cycle: system → dark → light → system …
    const THEME_KEY = 'lksb-theme';
    const themeBtn = document.getElementById('themeToggle');
    const themeLabel = document.getElementById('themeLabel');
    const html = document.documentElement;
    const mqDark = window.matchMedia('(prefers-color-scheme: dark)');

    // First-visit default is 'dark'. 'system' is honoured only if the user
    // has explicitly cycled to it (and is then persisted to localStorage so
    // we can distinguish "first visit" from "user picked system").
    function getMode() {
        return localStorage.getItem(THEME_KEY) || 'dark';
    }

    function applyTheme(mode) {
        const isLight = mode === 'light' || (mode === 'system' && !mqDark.matches);
        if (isLight) {
            html.setAttribute('data-theme', 'light');
        } else {
            html.removeAttribute('data-theme');
        }
        if (themeLabel) {
            themeLabel.textContent = mode === 'system' ? 'SYS' : mode === 'dark' ? 'DRK' : 'LGT';
        }
        if (themeBtn) {
            themeBtn.setAttribute('aria-label',
                `Toggle theme (current: ${mode}). Cycle: Dark → Light → System.`);
        }
        // Persist every explicit choice, including 'system'.
        localStorage.setItem(THEME_KEY, mode);
    }

    // Cycle order matches new default: Dark → Light → System → Dark …
    function nextMode(m) {
        return m === 'dark' ? 'light' : m === 'light' ? 'system' : 'dark';
    }

    applyTheme(getMode());
    if (themeBtn) {
        themeBtn.addEventListener('click', () => applyTheme(nextMode(getMode())));
    }
    mqDark.addEventListener('change', () => {
        if (getMode() === 'system') applyTheme('system');
    });

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ──────────  S C R O L L   R E V E A L  ──────────
    document.body.classList.add('js');
    const reveals = document.querySelectorAll('.hero, .log');

    if (reduceMotion || !('IntersectionObserver' in window)) {
        reveals.forEach(el => el.classList.add('in'));
    } else {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '0px 0px -8% 0px',
            threshold: 0.05
        });

        reveals.forEach(el => observer.observe(el));
    }

    // ──────────  S C R O L L - S P Y   ( S Y S B A R   N A V )  ──────────
    // Map of nav anchor → section element. Active section gets aria-current.
    const sysbar = document.querySelector('.sysbar');
    const navLinks = Array.from(document.querySelectorAll('.sys-nav a[href^="#"]'));
    const sectionMap = navLinks
        .map(a => {
            const id = a.getAttribute('href').slice(1);
            const el = document.getElementById(id);
            return el ? { link: a, el } : null;
        })
        .filter(Boolean);

    function setActive(activeEl) {
        sectionMap.forEach(({ link, el }) => {
            const on = el === activeEl;
            link.classList.toggle('is-active', on);
            if (on) {
                link.setAttribute('aria-current', 'true');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    // ──────────  P R O G R E S S   +   S H A D O W   +   S P Y  ──────────
    const progress = document.getElementById('readProgress');
    let rafId = null;

    function tick() {
        const y = window.scrollY;
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docH > 0 ? Math.min(100, Math.max(0, (y / docH) * 100)) : 0;

        if (progress) progress.style.width = pct + '%';

        if (sysbar) {
            if (y > 8) {
                sysbar.classList.add('is-scrolled');
            } else {
                sysbar.classList.remove('is-scrolled');
            }
        }

        // Scroll-spy — pick the section whose top crossed the trigger line.
        if (sectionMap.length) {
            const trigger = window.innerHeight * 0.35;
            let active = sectionMap[0].el;
            for (const { el } of sectionMap) {
                const top = el.getBoundingClientRect().top;
                if (top - trigger <= 0) active = el;
                else break;
            }
            setActive(active);
        }

        rafId = null;
    }

    function onScroll() {
        if (rafId == null) rafId = requestAnimationFrame(tick);
    }

    tick();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // ──────────  A N C H O R   S M O O T H   S C R O L L  ──────────
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;
        const href = link.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        const prevTabIndex = target.getAttribute('tabindex');
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        if (prevTabIndex === null) {
            target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
        }
    });

    // ──────────  S Y S _ I D   →   T O P  ──────────
    const sysId = document.querySelector('.sys-id');
    if (sysId) {
        sysId.addEventListener('click', (e) => {
            if (window.scrollY < 24) return;
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
        });
    }

    // ──────────  L I V E   B U I L D   S T A M P  ──────────
    // Replaces YYYY.MM.DD inside any [data-build-date] element by walking text
    // nodes so we don't destroy child markup (muted spans, dots, etc.).
    (() => {
        const today = new Date();
        const formatted = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;
        const datePattern = /\d{4}\.\d{2}\.\d{2}/;

        document.querySelectorAll('[data-build-date]').forEach(root => {
            const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
            let node;
            while ((node = walker.nextNode())) {
                if (datePattern.test(node.nodeValue)) {
                    node.nodeValue = node.nodeValue.replace(datePattern, formatted);
                }
            }
        });
    })();

})();
