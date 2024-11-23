const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
const uploadFolder = path.join(__dirname, 'uploads');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(uploadFolder));

// Multer setup untuk menyimpan file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    },
});

const upload = multer({ storage });

// Endpoint untuk unggah file
app.post('/upload', upload.single('pptFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'File tidak ditemukan!' });
    }
    res.json({ message: 'File berhasil diunggah!', filePath: `/uploads/${req.file.filename}` });
});

// Endpoint untuk daftar file
app.get('/files', (req, res) => {
    const fs = require('fs');
    fs.readdir(uploadFolder, (err, files) => {
        if (err) return res.status(500).json({ message: 'Gagal mengambil daftar file!' });
        res.json(files.map(file => ({ name: file, url: `/uploads/${file}` })));
    });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
