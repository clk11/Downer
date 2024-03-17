import express from 'express';
import cors from 'cors';
import ytdl from 'ytdl-core';
const app = express();

app.use(express.json({ extended: false }));
app.use(cors({ origin: true, credentials: true }));

app.post('/process', (req, res) => {
    const videoUrl = req.body.url;
    const stream = ytdl(videoUrl, { filter: 'audioonly', quality: 'highestaudio' });

    stream.on('error', error => {
        console.error('Stream Error:', error);
        res.status(500).send('Error converting video');
    });

    res.setHeader('Content-Type', 'audio/mpeg');
    stream.pipe(res);
});

app.get('/videoInfo', async (req, res) => {
    const videoUrl = req.query.param1;
    const title = (await ytdl.getInfo(videoUrl)).videoDetails.title;
    res.send(title);
})

app.listen(3001, () => {
    console.log(`Server is listening on port ${3001}`);
});
