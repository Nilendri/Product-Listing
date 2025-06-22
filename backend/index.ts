// backend/index.ts
import express from 'express';
import cors from 'cors';
import productRoutes from './route/ProductRoute';
import { AppDataSource } from './data-source';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
app.use('/uploads', express.static(path.join(__dirname, './uploads')));
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log('📦 Data Source has been initialized!');
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Error :', err);
  });
