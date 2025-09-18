// src/server.js

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import contactsRouter from './routers/contacts.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
 
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.use(contactsRouter); // Yönlendiriciyi app'e middleware olarak ekliyoruz


  app.use((req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((err, req, res) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });
  //5. Sunucu başarıyla başlatıldığında konsola “Server is running on port {PORT}” mesajının yazdırılması; burada {PORT} sizin port numaranızdır
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
