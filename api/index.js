import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();
const __dirname = path.resolve();
const app = express();

app.use(express.json());
app.use(cookieParser());

// 1. ⬇️ API ROUTELARNI ILK BO‘LIB YURITING
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

// 2. ⬇️ CLIENT STATIC FAYLLARNI QO‘SHING
app.use(express.static(path.join(__dirname, '/client/dist')));

// 3. ⬇️ faqat frontend route’lari uchun wildcard qo‘shing
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'client', 'dist', 'index.html');

  // Faqat agar `req.originalUrl` API bilan bog‘liq bo‘lmasa
  if (!req.originalUrl.startsWith('/api')) {
    return res.sendFile(indexPath);
  }

  // Aks holda API topilmadi xatosi
  res.status(404).json({ message: 'API route not found' });
});

// 4. ⬇️ ERROR HANDLER
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
