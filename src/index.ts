import express from 'express';
import { Request, Response } from 'express';

const app = express();
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/Id/:id/Name/:name', (req: Request, res: Response) => {
    res.send({
        message: "Hellou maailma!",
        data: req.params.id,
        name: req.params.name
    });
})

app.post('/Id/:id/Name/:name', (req: Request, res: Response) => {
    res.send({
        data: req.body,
        params: {
            id: req.params.id,
            name: req.params.name
        }
    })
})

app.listen(3000, () => {
    console.log('Kuunnellaan porttia 3000!');
})