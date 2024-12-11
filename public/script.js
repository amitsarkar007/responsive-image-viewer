const galleryContainer = document.getElementById('gallery');
const popup = document.getElementById('popup');
const popupImg = document.getElementById('popupImg');
let images = [];
let currentIndex = -1;

// Fetch image list from images.json
fetch('./images.json') // Correct relative path to the JSON file
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Fetched images:', data); // Debug log
        images = data; // Array of image filenames
        populateGallery();
    })
    .catch(error => console.error('Error fetching image list:', error));

function populateGallery() {
    const imageFolder = './images/'; // Correct relative path to the images folder
    console.log('Populating gallery with images:', images); // Debug log

    images.forEach((image, index) => {
        const img = document.createElement('img');
        img.src = `${imageFolder}${image}`; // Full path to the image
        img.alt = `Image ${index + 1}`;
        img.loading = "lazy";

        // Log for each image being added
        console.log(`Adding image to gallery: ${img.src}`);

        img.addEventListener('click', () => {
            openPopup(index);
        });
        galleryContainer.appendChild(img);
    });
}

function openPopup(index) {
    currentIndex = index;
    popup.style.display = 'flex';
    popupImg.src = `./images/${images[currentIndex]}`;
    console.log(`Opened popup for image: ${popupImg.src}`); // Debug log
}

function closePopup() {
    popup.style.display = 'none';
    console.log('Popup closed'); // Debug log
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    popupImg.src = `./images/${images[currentIndex]}`;
    console.log(`Next image: ${popupImg.src}`); // Debug log
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    popupImg.src = `./images/${images[currentIndex]}`;
    console.log(`Previous image: ${popupImg.src}`); // Debug log
}

// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.style.display = 'none'; // Hide the preloader once the page is loaded
    console.log('Page loaded and preloader hidden'); // Debug log
});