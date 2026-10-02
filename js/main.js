// Theme toggle, the BANKA_2 diagram's legend and current-section highlighting. No dependencies.
(() => {
    const root = document.documentElement;
    const button = document.getElementById('theme');

    const sync = () => {
        const dark = root.dataset.theme === 'dark';
        button.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
    };
    sync();

    button.addEventListener('click', () => {
        root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
        try { localStorage.setItem('theme', root.dataset.theme); } catch (_) {}
        sync();
    });

    // Until a theme is chosen with the button, follow the system setting as it changes.
    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        try { if (localStorage.getItem('theme')) return; } catch (_) {}
        root.dataset.theme = e.matches ? 'dark' : 'light';
        sync();
    });

    // The BANKA_2 diagram: pointing at, focusing or tapping a service shows what it does in the legend.
    const detail = document.getElementById('sys-detail');
    document.querySelectorAll('.node').forEach((node) => {
        const show = () => { detail.textContent = node.dataset.detail; };
        ['pointerenter', 'focus', 'click'].forEach((type) => node.addEventListener(type, show));
    });

    const links = new Map(
        [...document.querySelectorAll('.nav a')].map((a) => [a.hash.slice(1), a])
    );
    const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            links.forEach((a) => a.removeAttribute('aria-current'));
            links.get(entry.target.id)?.setAttribute('aria-current', 'true');
        }
    }, { rootMargin: '-45% 0px -50% 0px' });

    // The hero is observed too, with no link of its own, so scrolling back up clears the mark.
    ['top', ...links.keys()].forEach((id) => {
        const section = document.getElementById(id);
        if (section) observer.observe(section);
    });
})();
