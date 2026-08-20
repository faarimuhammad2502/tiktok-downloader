const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/download', async (req, res) => {
    const videoUrl = req.body.url;

    try {
        const response = await axios.get('https://tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com/index', {
            params: { url: videoUrl },
            headers: {
                'x-rapidapi-key': 'e4c7b565bcmsh136e87b8aa9ba7fp1f7ff1jsn80a4b11ce456',
                'x-rapidapi-host': 'tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com'
            }
        });

        const downloadUrl = response.data.video[0]; 
        const downloadUrlHd = response.data.video[1] || response.data.video[0]; 
        const audioUrl = response.data.music ? response.data.music[0] : null;

        res.json({ downloadUrl, downloadUrlHd, audioUrl });
    } catch (error) {
        res.status(500).json({ error: 'Gagal memproses video' });
    }
});

// Penyesuaian agar bekerja otomatis di Vercel maupun Local Laptop
module.exports = app;

if (process.env.NODE_ENV !== 'production') {
    app.listen(3000, () => console.log('Server berjalan di http://localhost:3000'));
}