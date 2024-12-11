const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const imageDirectory = path.join(__dirname, 'images');

app.use(express.static(__dirname));

app.get('/images', (req, res) => {
    fs.readdir(imageDirectory, (err, files) => {
        if (err) {
            res.status(500).send('Error reading images folder');
        } else {
            const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
            res.json(imageFiles);
        }
    });
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
