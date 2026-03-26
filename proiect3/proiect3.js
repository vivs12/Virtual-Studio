// ======================== FILTRARE DUPĂ CATEGORIE ========================
const filterBtns = document.querySelectorAll(".filter-btn");
const posts = document.querySelectorAll(".post");

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        let category = btn.dataset.category;

        posts.forEach(post => {
            if (category === "all" || post.dataset.category === category) {
                post.style.display = "block";
            } else {
                post.style.display = "none";
            }
        });
    });
});

// ======================== CĂUTARE LIVE ========================
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", () => {
    let value = searchInput.value.toLowerCase();

    posts.forEach(post => {
        let text = post.innerText.toLowerCase();
        post.style.display = text.includes(value) ? "block" : "none";
    });
});

// ======================== DARK MODE ========================
const themeToggle = document.getElementById("themeToggle");

function setDarkModeOnArticol1(isDark) {
    if (document.body.classList.contains('articol1')) {
        if (isDark) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    setDarkModeOnArticol1(document.body.classList.contains('dark'));
    // Optionally, persist mode in localStorage
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// On page load, set dark mode if saved
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    setDarkModeOnArticol1(true);
}

// ======================== SLIDER ========================
let slides = document.querySelectorAll(".slide");
let index = 0;

function showSlide(i) {
    slides.forEach(s => s.classList.remove("active"));
    slides[i].classList.add("active");
}

document.querySelector(".next").addEventListener("click", () => {
    index = (index + 1) % slides.length;
    showSlide(index);
});

document.querySelector(".prev").addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
});

setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(index);
}, 4000);