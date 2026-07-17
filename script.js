// THEME TOGGLE
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

themeToggle.addEventListener('click', () => {
    const cur = html.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    themeIcon.className = next === 'dark' ? 'fa-solid fa-moon text-[var(--accent)]' : 'fa-solid fa-sun text-[var(--accent)]';
});

// LIVE CLOCK
function updateClock() {
    try {
        const now = new Date();
        const opts = { timeZone: 'Africa/Cairo', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        const t = now.toLocaleTimeString('en-GB', opts);
        const live = document.getElementById('liveClock');
        const big = document.getElementById('bigClock');
        if (live) live.textContent = t;
        if (big) big.textContent = t;
    } catch(e) {
        const t = new Date().toLocaleTimeString('en-GB');
        const live = document.getElementById('liveClock');
        const big = document.getElementById('bigClock');
        if (live) live.textContent = t;
        if (big) big.textContent = t;
    }
}
updateClock();
setInterval(updateClock, 1000);

// HEADER SCROLL
const header = document.getElementById('mainHeader');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('backdrop-blur-xl','bg-black/60','shadow-lg');
    } else {
        header.classList.remove('backdrop-blur-xl','bg-black/60','shadow-lg');
    }
    const bt = document.getElementById('backTop');
    if (window.scrollY > 600) bt.classList.add('show');
    else bt.classList.remove('show');
});

document.getElementById('backTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// MOBILE NAV
const mobileNav = document.getElementById('mobileNav');
document.getElementById('menuToggle').addEventListener('click', () => {
    mobileNav.classList.add('open');
    document.body.classList.add('nav-open');
});
document.getElementById('menuClose').addEventListener('click', () => {
    mobileNav.classList.remove('open');
    document.body.classList.remove('nav-open');
});
document.querySelectorAll('.mobile-link').forEach(l => {
    l.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        document.body.classList.remove('nav-open');
    });
});

// SCROLL REVEAL
const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('active');
            io.unobserve(e.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => io.observe(el));

// EMBERS
const emberContainer = document.getElementById('emberContainer');
function spawnEmber() {
    const e = document.createElement('div');
    e.className = 'ember';
    const size = 2 + Math.random() * 4;
    e.style.width = size + 'px';
    e.style.height = size + 'px';
    e.style.left = Math.random() * 100 + '%';
    e.style.animationDuration = (6 + Math.random() * 6) + 's';
    e.style.animationDelay = Math.random() * 1 + 's';
    emberContainer.appendChild(e);
    setTimeout(() => e.remove(), 13000);
}
for (let i = 0; i < 8; i++) setTimeout(spawnEmber, i * 600);
setInterval(spawnEmber, 800);

// 3D TILT
document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        const cx = r.width / 2;
        const cy = r.height / 2;
        const rx = ((y - cy) / cy) * -8;
        const ry = ((x - cx) / cx) * 8;
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
        card.style.setProperty('--mx', (x / r.width * 100) + '%');
        card.style.setProperty('--my', (y / r.height * 100) + '%');
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// CAROUSEL
const track = document.getElementById('carouselTrack');
const slides = track.children;
const dots = document.querySelectorAll('.dot');
let curSlide = 0;
let autoTimer;

function goToSlide(i) {
    curSlide = (i + slides.length) % slides.length;
    track.style.transform = `translateX(${curSlide * 100}%)`;
    dots.forEach((d, idx) => {
        if (idx === curSlide) {
            d.classList.remove('bg-[var(--border)]');
            d.classList.add('bg-[var(--accent)]');
            d.style.width = '24px';
        } else {
            d.classList.remove('bg-[var(--accent)]');
            d.classList.add('bg-[var(--border)]');
            d.style.width = '10px';
        }
    });
}

function nextSlide() { goToSlide(curSlide + 1); }
function prevSlide() { goToSlide(curSlide - 1); }

document.getElementById('nextBtn').addEventListener('click', () => { nextSlide(); resetAuto(); });
document.getElementById('prevBtn').addEventListener('click', () => { prevSlide(); resetAuto(); });
dots.forEach(d => d.addEventListener('click', () => { goToSlide(parseInt(d.dataset.idx)); resetAuto(); }));

function startAuto() { autoTimer = setInterval(nextSlide, 5500); }
function resetAuto() { clearInterval(autoTimer); startAuto(); }
startAuto();

track.parentElement.addEventListener('mouseenter', () => clearInterval(autoTimer));
track.parentElement.addEventListener('mouseleave', startAuto);
goToSlide(0);

// NOTIFICATION
const notif = document.getElementById('notification');
setTimeout(() => notif.classList.add('show'), 2500);
setTimeout(() => notif.classList.remove('show'), 9000);
document.getElementById('notifClose').addEventListener('click', () => notif.classList.remove('show'));

// CONFETTI ON LOAD
function fireConfetti() {
    const colors = ['#ff6b1a', '#ff3d00', '#ff8c42', '#ffd600', '#ffffff'];
    for (let i = 0; i < 50; i++) {
        const c = document.createElement('div');
        c.className = 'confetti-piece';
        c.style.left = Math.random() * 100 + 'vw';
        c.style.background = colors[Math.floor(Math.random() * colors.length)];
        c.style.animationDelay = Math.random() * 0.5 + 's';
        c.style.animationDuration = (2.5 + Math.random() * 2) + 's';
        c.style.transform = `rotate(${Math.random() * 360}deg)`;
        if (Math.random() > 0.5) c.style.borderRadius = '50%';
        document.body.appendChild(c);
        setTimeout(() => c.remove(), 4500);
    }
}
window.addEventListener('load', () => setTimeout(fireConfetti, 400));

// KEYBOARD NAV
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        mobileNav.classList.remove('open');
        document.body.classList.remove('nav-open');
        notif.classList.remove('show');
    }
    if (e.key === 'ArrowLeft') { nextSlide(); resetAuto(); }
    if (e.key === 'ArrowRight') { prevSlide(); resetAuto(); }
});
