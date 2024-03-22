import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Terve maailma!');
})

app.listen(3000, () => {
    console.log('Kuunnellaan porttia 3000!');
})