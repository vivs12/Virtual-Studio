// Dark mode removed: no theme persistence or toggles


// ======================== FILTRARE DUPĂ CATEGORIE ========================
const filterBtns = document.querySelectorAll(".filter-btn");
const posts = document.querySelectorAll(".post");

if (filterBtns.length && posts.length) {
    filterBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const category = btn.dataset.category;

            posts.forEach(post => {
                post.style.display =
                    category === "all" || post.dataset.category === category
                        ? "block"
                        : "none";
            });
        });
    });
}

// ======================== CĂUTARE LIVE ========================
const searchInput = document.getElementById("searchInput");

if (searchInput && posts.length) {
    searchInput.addEventListener("keyup", () => {
        const value = searchInput.value.toLowerCase();

        posts.forEach(post => {
            post.style.display = post.innerText.toLowerCase().includes(value)
                ? "block"
                : "none";
        });
    });
}

// ======================== SLIDER ========================
const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let index = 0;

function showSlide(i) {
    slides.forEach(s => s.classList.remove("active"));
    if(slides[i]) slides[i].classList.add("active");
}

// ======================== HERO IMAGE ROTATOR ========================
(() => {
    const heroImages = [
        'https://p3-ofp.static.pub/ShareResource/indirect/static-content/yoga/yoga-intel/images/lenovo-yoga-hero-intel-oct-2024.jpg',
        'https://www.connect.ro/wp-content/smush-webp/2024/12/telefoane-flagship-reducere-craciun-oferte-900x570.jpg.webp',
        'https://www.enrgtech.co.uk/blog/wp-content/uploads/2022/12/jbareham_160418_0931_0086_FINAL_NO_BUFFER_5MB_02.0-1200x675.jpg'
    ];

    const start = () => {
        const heroLarge = document.querySelector('.hero-visual .screen img');
        if (!heroLarge) return;

        let heroIndex = 0;
        let rotInterval = null;

        const preload = (src) => {
            const i = new Image();
            i.src = src;
        };

        // preload images
        heroImages.forEach(preload);

        const swapHero = (idx) => {
            try {
                heroLarge.style.transition = 'opacity .35s ease';
                heroLarge.style.opacity = '0';
                setTimeout(() => {
                    heroLarge.src = heroImages[idx];
                    heroLarge.style.opacity = '1';
                }, 300);
            } catch (e) {
                console.error('swapHero error', e);
            }
        };

        rotInterval = setInterval(() => {
            heroIndex = (heroIndex + 1) % heroImages.length;
            swapHero(heroIndex);
        }, 3500);

        // initialize
        swapHero(heroIndex);

        // pause on hover
        heroLarge.addEventListener('mouseenter', () => { if (rotInterval) clearInterval(rotInterval); });
        heroLarge.addEventListener('mouseleave', () => { rotInterval = setInterval(() => { heroIndex = (heroIndex + 1) % heroImages.length; swapHero(heroIndex); }, 3500); });
    };

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();

// ======================== NAV TOGGLE (MOBILE) ========================
const navToggle = document.querySelector('.nav-toggle');
const header = document.querySelector('header');
const primaryNav = document.querySelector('nav.nav-links');

if (navToggle && header && primaryNav) {
    navToggle.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!expanded));
        header.classList.toggle('nav-open');
    });

    // Close nav when clicking outside
    document.addEventListener('click', (e) => {
        if (!header.contains(e.target) && header.classList.contains('nav-open')) {
            header.classList.remove('nav-open');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // keyboard: Escape to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && header.classList.contains('nav-open')) {
            header.classList.remove('nav-open');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.focus();
        }
    });
}

// Theme toggle removed (no accessible aria updates needed)

// ======================== BACK TO TOP ========================
const backToTop = document.createElement('button');
backToTop.className = 'back-to-top';
backToTop.innerText = '↑';
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) backToTop.classList.add('show'); else backToTop.classList.remove('show');
});

backToTop.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));

// Verificăm dacă există slider pe pagină
if (slides.length) {
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            index = (index + 1) % slides.length;
            showSlide(index);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            index = (index - 1 + slides.length) % slides.length;
            showSlide(index);
        });
    }

    // Slider automat
    setInterval(() => {
        index = (index + 1) % slides.length;
        showSlide(index);
    }, 4000);
}
