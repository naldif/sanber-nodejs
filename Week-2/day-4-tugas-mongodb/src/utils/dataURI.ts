import { Readable } from 'stream';

export const toDataURI = (file: Express.Multer.File): string => {
  const base64 = file.buffer.toString('base64');
  const mimeType = file.mimetype;
  return `data:${mimeType};base64,${base64}`;
};
