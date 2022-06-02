import { diskStorage } from 'multer';

import { ConfigService } from '@nestjs/config';

export const saveImageToStorage = {
  storage: diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(
        null,
        file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1],
      );
    },
  }),
};
