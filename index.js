const express = require('express');
const bodyParser = require('body-parser');
const newsData = require('./news.json');

const app = express();
const port = 3000;  // Ganti port jika diperlukan  

app.use(bodyParser.json());

// Tambahkan middleware CORS  
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:3001'); // Ganti dengan origin website Anda  
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Tambahkan method yang dibutuhkan  
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
// Untuk request body (jika dibutuhkan di masa mendatang)  

// Endpoint untuk menampilkan semua berita  
app.get('/api/news/all', (req, res) => {
    res.json(newsData);
});

// Endpoint untuk menampilkan detail berita berdasarkan ID  
app.get('/api/news/:id', (req, res) => {
    const newsItem = newsData.find(item => item.id === parseInt(req.params.id));
    if (newsItem) {
        res.json(newsItem);
    } else {
        res.status(404).json({ message: 'Berita tidak ditemukan' });
    }
});

// Endpoint untuk mencari berita berdasarkan judul  
app.get('/api/news', (req, res) => {
    const searchTerm = req.query.search;
    const results = newsData.filter(item => item.judul.toLowerCase().includes(searchTerm.toLowerCase()));
    res.json(results);
});


app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});