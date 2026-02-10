(function() {
    const css = `.liquid-bg { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: -2; background: #fff; overflow: hidden; }
                 .blob { position: absolute; opacity: 0.15; filter: blur(50px); will-change: transform; }`;
    const styleSheet = document.createElement("style");
    styleSheet.innerText = css;
    document.head.appendChild(styleSheet);

    const container = document.createElement('div');
    container.className = 'liquid-bg';
    document.body.prepend(container);

    const colors = ['#a1c4fd', '#c2e9fb', '#fbc2eb', '#ffecd2', '#84fab0'];
    const blobs = [];

    for (let i = 0; i < 8; i++) {
        const el = document.createElement('div');
        el.className = 'blob';
        const size = Math.random() * 40 + 30;
        el.style.width = size + 'vw'; el.style.height = size + 'vh';
        el.style.backgroundColor = colors[i % colors.length];
        el.style.borderRadius = "50%";
        container.appendChild(el);
        blobs.push({ el, x: Math.random() * 100, y: Math.random() * 100, vx: (Math.random()-0.5)*600, vy: (Math.random()-0.5)*900 });
    }

    let scrollFraction = 0;
    window.addEventListener('scroll', () => {
        scrollFraction = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    });

    function anim() {
        const time = Date.now() * 0.0005;
        blobs.forEach((b, i) => {
            const driftX = Math.sin(time + i) * 50;
            const driftY = Math.cos(time + i) * 50;
            const tx = (b.x / 100 * window.innerWidth) + (scrollFraction * b.vx) + driftX;
            const ty = (b.y / 100 * window.innerHeight) + (scrollFraction * b.vy) + driftY;
            b.el.style.transform = `translate(${tx - 100}px, ${ty - 100}px) rotate(${scrollFraction * 120}deg)`;
        });
        requestAnimationFrame(anim);
    }
    anim();
})();