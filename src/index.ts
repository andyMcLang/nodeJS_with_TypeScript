import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Terve maailma!');
})

app.post('/', (req, res) => {
    res.send({
        data: req.body
    })
})

app.listen(3000, () => {
    console.log('Kuunnellaan porttia 3000!');
})