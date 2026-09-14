import express from 'express';
import equipmentRoutes from './routes/equipmentRoutes.js';

const app = express();

app.use(express.json());

app.use(equipmentRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});