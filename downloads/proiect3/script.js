// ======================== DARK MODE UNIVERSAL ========================

// Aplică tema salvată la încărcarea paginii
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    document.body.classList.add("dark");
}

// Toggle dark mode dacă există butonul
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const isDark = document.body.classList.toggle("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");
    });
}

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
