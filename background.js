(function() {
    const css = `.liquid-bg { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: -2; background: #fff; overflow: hidden; }
                 .blob { position: absolute; opacity: 0.12; filter: blur(40px); will-change: transform; }`;
    const styleSheet = document.createElement("style");
    styleSheet.innerText = css;
    document.head.appendChild(styleSheet);

    const container = document.createElement('div');
    container.className = 'liquid-bg';
    document.body.prepend(container);

    const colors = ['#a1c4fd', '#c2e9fb', '#fbc2eb', '#ffecd2', '#84fab0'];
    const blobs = [];

    const COUNT = 5; // fewer elements for better performance
    for (let i = 0; i < COUNT; i++) {
        const el = document.createElement('div');
        el.className = 'blob';
        const size = Math.random() * 40 + 30;
        el.style.width = size + 'vw'; el.style.height = size + 'vh';
        el.style.backgroundColor = colors[i % colors.length];
        el.style.borderRadius = "50%";
        container.appendChild(el);
        blobs.push({ el, x: Math.random() * 100, y: Math.random() * 100, vx: (Math.random()-0.5)*500, vy: (Math.random()-0.5)*700 });
    }

    let scrollFraction = 0;
    let vw = window.innerWidth;
    let vh = window.innerHeight;
    function recalcBase() {
        blobs.forEach(b => {
            b.baseX = (b.x / 100) * vw;
            b.baseY = (b.y / 100) * vh;
        });
    }
    recalcBase();
    window.addEventListener('resize', () => {
        vw = window.innerWidth; vh = window.innerHeight; recalcBase();
    });
    window.addEventListener('scroll', () => {
        scrollFraction = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    }, { passive: true });

    function anim() {
        const time = Date.now() * 0.0004;
        blobs.forEach((b, i) => {
            const driftX = Math.sin(time + i) * 40;
            const driftY = Math.cos(time + i) * 40;
            const tx = b.baseX + (scrollFraction * b.vx) + driftX;
            const ty = b.baseY + (scrollFraction * b.vy) + driftY;
            b.el.style.transform = `translate3d(${tx - 100}px, ${ty - 100}px, 0)`;
        });
        requestAnimationFrame(anim);
    }
    anim();
})();