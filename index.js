
const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const filterButtons = document.querySelectorAll(".filter-btn");

let visibleImages = [];
let currentIndex = 0;

// Get currently visible images
function updateVisibleImages() {
    visibleImages = Array.from(galleryItems)
        .filter(item => item.style.display !== "none")
        .map(item => item.querySelector("img"));
}

// Open lightbox
function openLightbox(index) {
    updateVisibleImages();

    currentIndex = index;
    lightboxImg.src = visibleImages[currentIndex].src;
    lightbox.style.display = "flex";
}

// Gallery click event
galleryItems.forEach(item => {
    item.addEventListener("click", () => {
        updateVisibleImages();

        const img = item.querySelector("img");
        const index = visibleImages.indexOf(img);

        openLightbox(index);
    });
});

// Next image
nextBtn.addEventListener("click", () => {
    currentIndex++;

    if (currentIndex >= visibleImages.length) {
        currentIndex = 0;
    }

    lightboxImg.src = visibleImages[currentIndex].src;
});

// Previous image
prevBtn.addEventListener("click", () => {
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = visibleImages.length - 1;
    }

    lightboxImg.src = visibleImages[currentIndex].src;
});

// Close lightbox
closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
});

// Close when clicking outside image
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = "none";
    }
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {
        if (e.key === "ArrowRight") {
            nextBtn.click();
        }

        if (e.key === "ArrowLeft") {
            prevBtn.click();
        }

        if (e.key === "Escape") {
            lightbox.style.display = "none";
        }
    }
});

// Category filters
filterButtons.forEach(button => {
    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const filter = button.dataset.filter;

        galleryItems.forEach(item => {

            const category = item.dataset.category;

            if (filter === "all" || category === filter) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }

        });

        updateVisibleImages();
    });
});

// Initial setup
updateVisibleImages();
