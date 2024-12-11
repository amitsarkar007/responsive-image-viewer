const galleryContainer = document.getElementById('gallery');
const popup = document.getElementById('popup');
const popupImg = document.getElementById('popupImg');
let images = [];
let currentIndex = -1;

// Fetch image list from the server
fetch('/images')
    .then(response => response.json())
    .then(data => {
        images = data;
        populateGallery();
    })
    .catch(error => console.error('Error fetching images:', error));

function populateGallery() {
    images.forEach((image, index) => {
        const img = document.createElement('img');
        img.src = `images/${image}`;
        img.alt = `Image ${index + 1}`;
        img.loading = "lazy";
        img.addEventListener('click', () => {
            openPopup(index);
        });
        galleryContainer.appendChild(img);
    });
}

function openPopup(index) {
    currentIndex = index;
    popup.style.display = 'flex';
    popupImg.src = `images/${images[currentIndex]}`;
}

function closePopup() {
    popup.style.display = 'none';
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    popupImg.src = `images/${images[currentIndex]}`;
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    popupImg.src = `images/${images[currentIndex]}`;
}

// Wait for the DOM and critical resources to load
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.style.display = 'none'; // Hide the preloader once the page is loaded
});