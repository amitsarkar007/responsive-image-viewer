const fs = require('fs');
const path = require('path');

// Path to the images directory
const imagesDir = path.join(__dirname, 'public/images');

// Scan the images directory and save the file list
fs.readdir(imagesDir, (err, files) => {
    if (err) {
        console.error('Error reading images directory:', err);
        return;
    }

    // Filter only image files
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

    // Write the file list to a JSON file
    fs.writeFileSync(path.join(__dirname, 'public/images.json'), JSON.stringify(imageFiles, null, 2));
    console.log('File list generated:', imageFiles);
});
