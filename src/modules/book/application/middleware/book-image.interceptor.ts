import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const BookImageInterceptor = () =>
  FileInterceptor('file', {
    storage: diskStorage({
      destination: './public/images/books',
      filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}${extname(file.originalname)}`;
        cb(null, uniqueName);
      },
    }),
  });