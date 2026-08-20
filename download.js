const axios = require('axios');

module.exports = async (req, res) => {
    // Izinkan CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const videoUrl = req.body ? req.body.url : null;

    if (!videoUrl) {
        return res.status(400).json({ error: 'URL tidak ditemukan' });
    }

    try {
        const response = await axios.get('https://tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com/index', {
            params: { url: videoUrl },
            headers: {
                'x-rapidapi-key': 'e4c7b565bcmsh136e87b8aa9ba7fp1f7ff1jsn80a4b11ce456',
                'x-rapidapi-host': 'tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com'
            }
        });

        const downloadUrl = response.data.video ? response.data.video[0] : null; 
        const downloadUrlHd = response.data.video && response.data.video[1] ? response.data.video[1] : downloadUrl; 
        const audioUrl = response.data.music ? response.data.music[0] : null;

        res.status(200).json({ downloadUrl, downloadUrlHd, audioUrl });
    } catch (error) {
        res.status(500).json({ error: 'Gagal memproses video' });
    }
};
