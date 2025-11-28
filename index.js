import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bukuroutes from './routes/buku.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/buku', bukuroutes);

app.listen(process.env.PORT,() => {
    console.log(`Server berjalan pada port ${process.env.PORT}`);
});

