// src/server.js

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { getAllContacts } from './services/contacts.js';
//4. Sunucunun, PORT ortam değişkeni aracılığıyla belirtilen veya belirtilmemişse 3000 numaralı portta başlatılması
const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  //1.express() çağrısıyla sunucunun oluşturulması
  const app = express();
  //2.cors ve pino logger'ının ayarlanması
  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  //   app.get('/students/:studentId', async (req, res) => {
  //     const { studentId } = req.params;
  //     const student = await getStudentById(studentId);

  //     // Öğrenci bulunamazsa yanıt
  //     if (!student) {
  //       res.status(404).json({
  //         message: 'Öğrenci bulunamadı',
  //       });
  //       return;
  //     }

  //     // Öğrenci bulunursa yanıt
  //     res.status(200).json({
  //       data: student,
  //     });
  //   });

  //3.Mevcut olmayan rotalar için 404 hata durumu ve uygun mesaj döndürülmesi.
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
