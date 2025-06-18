import express from 'express';
import mapDataRouter from './router/pathSvg-router.js'
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors()); 
const port = 3000;

app.use('/mapsData', mapDataRouter);

app.listen(port, () =>{
    console.log("Servidor em execução!");
})


