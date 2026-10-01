// Hero Tetris. A one-ply search agent tries every rotation and column for the piece in play,
// scores each landing with four board features and plays the best one. Focus the board and
// press an arrow key to take over; after ten idle seconds the agent takes the game back.
(() => {
    const root = document.getElementById('tetris');
    if (!root) return;
    const board = root.querySelector('.board');
    const preview = root.querySelector('.next');
    const linesOut = root.querySelector('[data-lines]');
    const modeOut = root.querySelector('[data-mode]');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

    const W = 10, H = 20;
    const MOVE_MS = 85, DROP_MS = 26, GRAVITY_MS = 550, FLASH_MS = 240, IDLE_MS = 10000;
    // Weights from Yiyuan Lee's genetic search over the same four features.
    const WEIGHTS = { height: -0.510066, lines: 0.760666, holes: -0.35663, bumpiness: -0.184483 };

    const SHAPES = {
        I: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
        O: [[1, 1], [1, 1]],
        T: [[0, 1, 0], [1, 1, 1], [0, 0, 0]],
        S: [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
        Z: [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
        J: [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
        L: [[0, 0, 1], [1, 1, 1], [0, 0, 0]],
    };
    const turn = (m) => m[0].map((_, c) => m.map((row) => row[c]).reverse());
    const ROTATIONS = {};
    for (const [kind, m] of Object.entries(SHAPES)) {
        ROTATIONS[kind] = [m, turn(m), turn(turn(m)), turn(turn(turn(m)))];
    }

    // Seeded, so the board a visitor first sees is always a sensible mid-game position.
    let seed = 20260930;
    const random = () => {
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    let bag = [];
    const nextFromBag = () => {
        if (!bag.length) {
            bag = Object.keys(SHAPES);
            for (let i = bag.length - 1; i > 0; i--) {
                const j = Math.floor(random() * (i + 1));
                [bag[i], bag[j]] = [bag[j], bag[i]];
            }
        }
        return bag.pop();
    };

    const emptyGrid = () => Array.from({ length: H }, () => new Array(W).fill(0));
    const fits = (g, m, x, y) => {
        for (let r = 0; r < m.length; r++) {
            for (let c = 0; c < m.length; c++) {
                if (!m[r][c]) continue;
                const gx = x + c, gy = y + r;
                if (gx < 0 || gx >= W || gy >= H || (gy >= 0 && g[gy][gx])) return false;
            }
        }
        return true;
    };
    const spawnY = (m) => -m.findIndex((row) => row.some(Boolean));
    const landingY = (g, m, x, y) => { while (fits(g, m, x, y + 1)) y++; return y; };
    // Returns the grid with the piece merged in, or null when it sticks out of the top.
    const merge = (g, m, x, y) => {
        const out = g.map((row) => row.slice());
        for (let r = 0; r < m.length; r++) {
            for (let c = 0; c < m.length; c++) {
                if (!m[r][c]) continue;
                if (y + r < 0) return null;
                out[y + r][x + c] = 1;
            }
        }
        return out;
    };
    const fullRows = (g) => g.flatMap((row, y) => (row.every(Boolean) ? [y] : []));
    const withoutRows = (g, rows) => [
        ...rows.map(() => new Array(W).fill(0)),
        ...g.filter((_, y) => !rows.includes(y)),
    ];

    const evaluate = (g, cleared) => {
        let height = 0, holes = 0, bumpiness = 0, previous = -1;
        for (let x = 0; x < W; x++) {
            let top = H;
            for (let y = 0; y < H; y++) if (g[y][x]) { top = y; break; }
            const h = H - top;
            for (let y = top + 1; y < H; y++) if (!g[y][x]) holes++;
            height += h;
            if (previous >= 0) bumpiness += Math.abs(h - previous);
            previous = h;
        }
        return WEIGHTS.height * height + WEIGHTS.lines * cleared
            + WEIGHTS.holes * holes + WEIGHTS.bumpiness * bumpiness;
    };
    const bestMove = (g, kind) => {
        let best = null;
        ROTATIONS[kind].forEach((m, r) => {
            const y0 = spawnY(m);
            for (let x = -2; x < W; x++) {
                if (!fits(g, m, x, y0)) continue;
                const y = landingY(g, m, x, y0);
                const merged = merge(g, m, x, y);
                if (!merged) continue;
                const rows = fullRows(merged);
                const score = evaluate(withoutRows(merged, rows), rows.length);
                if (!best || score > best.score) best = { r, x, y, score };
            }
        });
        return best;
    };

    // Game state.
    let grid = emptyGrid();
    let piece = null;
    let upcoming = nextFromBag();
    let target = null;
    let flash = null;
    let lines = 0;
    let mode = reduced ? 'paused' : 'agent';
    let lastInput = 0;
    let clock = 0;

    for (let i = 0; i < 26; i++) {
        const kind = nextFromBag();
        const move = bestMove(grid, kind);
        const merged = move && merge(grid, ROTATIONS[kind][move.r], move.x, move.y);
        if (!merged) break;
        grid = withoutRows(merged, fullRows(merged));
    }
    seed = (Math.random() * 2 ** 32) | 0;
    bag = [];

    const shape = () => ROTATIONS[piece.kind][piece.r];
    const setMode = (next) => {
        mode = next;
        modeOut.textContent = { agent: 'Autopilot', human: 'You', paused: 'Paused' }[next];
    };
    const spawn = () => {
        const m = ROTATIONS[upcoming][0];
        piece = { kind: upcoming, r: 0, x: Math.floor((W - m.length) / 2), y: spawnY(m) };
        upcoming = nextFromBag();
        if (!fits(grid, m, piece.x, piece.y)) { grid = emptyGrid(); lines = 0; linesOut.textContent = '0'; }
        target = mode === 'human' ? null : bestMove(grid, piece.kind);
        drawPreview();
    };
    const lock = () => {
        const merged = merge(grid, shape(), piece.x, piece.y);
        if (!merged) { grid = emptyGrid(); lines = 0; linesOut.textContent = '0'; spawn(); return; }
        grid = merged;
        piece = null;
        const rows = fullRows(grid);
        if (rows.length) flash = { rows, at: clock };
        else spawn();
    };
    const tryMove = (dx, dy, dr = 0) => {
        const r = (piece.r + dr + 4) % 4;
        const m = ROTATIONS[piece.kind][r];
        // A rotation against a wall gets one step of room on either side.
        for (const kick of dr ? [0, -1, 1] : [0]) {
            if (fits(grid, m, piece.x + dx + kick, piece.y + dy)) {
                piece.x += dx + kick; piece.y += dy; piece.r = r;
                return true;
            }
        }
        return false;
    };

    // Moves the piece down a row, or locks it. A cleared line holds the board for its flash.
    const fall = (delay) => {
        if (tryMove(0, 1)) return delay;
        lock();
        return flash ? FLASH_MS : delay;
    };

    // One step of play. Returns the delay until the next one.
    const step = () => {
        if (flash) {
            grid = withoutRows(grid, flash.rows);
            lines += flash.rows.length;
            linesOut.textContent = String(lines);
            flash = null;
            spawn();
            return MOVE_MS;
        }
        if (!piece) spawn();
        if (mode === 'human') {
            if (clock - lastInput > IDLE_MS) {
                setMode(reduced ? 'paused' : 'agent');
                target = bestMove(grid, piece.kind);
                return MOVE_MS;
            }
            return fall(GRAVITY_MS);
        }
        if (!target) return fall(DROP_MS);
        if (piece.r !== target.r) {
            if (!tryMove(0, 0, 1)) { piece.r = target.r; piece.x = target.x; }
            return MOVE_MS;
        }
        if (piece.x !== target.x) {
            if (!tryMove(Math.sign(target.x - piece.x), 0)) piece.x = target.x;
            return MOVE_MS;
        }
        return fall(DROP_MS);
    };

    // Drawing.
    const ctx = board.getContext('2d');
    const pctx = preview.getContext('2d');
    let size = 0;
    let colors = {};
    const readColors = () => {
        const css = getComputedStyle(root);
        colors = Object.fromEntries(['screen', 'screen-grid', 'block', 'accent']
            .map((name) => [name, css.getPropertyValue(`--${name}`).trim()]));
    };
    const fitCanvas = (canvas, context, w, h) => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const resize = () => {
        size = board.clientWidth / W;
        fitCanvas(board, ctx, size * W, size * H);
        fitCanvas(preview, pctx, preview.clientWidth, preview.clientHeight);
        render();
        drawPreview();
    };
    const block = (c, x, y, s, fill, outline = false) => {
        const gap = Math.max(1, s * 0.07);
        c.beginPath();
        c.roundRect(x * s + gap, y * s + gap, s - gap * 2, s - gap * 2, s * 0.16);
        if (outline) { c.strokeStyle = fill; c.lineWidth = 1.5; c.globalAlpha = 0.55; c.stroke(); c.globalAlpha = 1; }
        else { c.fillStyle = fill; c.fill(); }
    };
    const cells = (m, fn) => m.forEach((row, r) => row.forEach((v, c) => v && fn(r, c)));
    const render = () => {
        if (!size) return;
        ctx.fillStyle = colors.screen;
        ctx.fillRect(0, 0, size * W, size * H);
        ctx.fillStyle = colors['screen-grid'];
        for (let x = 1; x < W; x++) ctx.fillRect(x * size, 0, 1, size * H);
        for (let y = 1; y < H; y++) ctx.fillRect(0, y * size, size * W, 1);
        grid.forEach((row, y) => row.forEach((v, x) => {
            if (v) block(ctx, x, y, size, flash?.rows.includes(y) ? colors.accent : colors.block);
        }));
        if (!piece) return;
        const m = shape();
        const ghost = mode === 'human'
            ? { r: piece.r, x: piece.x, y: landingY(grid, m, piece.x, piece.y) }
            : target;
        if (ghost) cells(ROTATIONS[piece.kind][ghost.r], (r, c) => block(ctx, ghost.x + c, ghost.y + r, size, colors.accent, true));
        cells(m, (r, c) => piece.y + r >= 0 && block(ctx, piece.x + c, piece.y + r, size, colors.accent));
    };
    const drawPreview = () => {
        const w = preview.clientWidth, s = w / 5;
        pctx.clearRect(0, 0, w, w);
        const m = SHAPES[upcoming];
        const rows = m.filter((row) => row.some(Boolean));
        const cols = m[0].map((_, c) => m.some((row) => row[c]));
        const width = cols.filter(Boolean).length, left = cols.indexOf(true);
        const ox = (5 - width) / 2 - left, oy = (5 - rows.length) / 2 - m.findIndex((row) => row.some(Boolean));
        cells(m, (r, c) => block(pctx, ox + c, oy + r, s, colors.accent));
    };

    // The loop runs only while the board is on screen and the tab is visible.
    let visible = false, frame = 0, due = 0, then = 0;
    const tick = (now) => {
        clock += Math.min(now - then, 100);
        then = now;
        if (clock >= due) due = clock + step();
        render();
        frame = mode === 'paused' ? 0 : requestAnimationFrame(tick);
    };
    const run = () => {
        const go = visible && !document.hidden && mode !== 'paused';
        if (go && !frame) { then = performance.now(); frame = requestAnimationFrame(tick); }
        if (!go && frame) { cancelAnimationFrame(frame); frame = 0; }
    };

    board.addEventListener('keydown', (e) => {
        const keys = { ArrowLeft: [-1, 0, 0], ArrowRight: [1, 0, 0], ArrowDown: [0, 1, 0], ArrowUp: [0, 0, 1], ' ': null };
        if (!(e.key in keys)) return;
        e.preventDefault();
        if (mode !== 'human') { setMode('human'); target = null; run(); }
        lastInput = clock;
        if (!piece) return;
        if (e.key === ' ') {
            piece.y = landingY(grid, shape(), piece.x, piece.y);
            lock();
            due = clock + (flash ? FLASH_MS : MOVE_MS);
        }
        else tryMove(...keys[e.key]);
        render();
    });

    readColors();
    setMode(mode);
    spawn();
    new ResizeObserver(resize).observe(board);
    new MutationObserver(() => { readColors(); render(); drawPreview(); })
        .observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; run(); }).observe(board);
    document.addEventListener('visibilitychange', run);
})();
