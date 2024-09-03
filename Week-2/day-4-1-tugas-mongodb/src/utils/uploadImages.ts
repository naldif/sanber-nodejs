import cloudinary from '../config/cloudinary';
import { Readable } from 'stream';
import { v4 as uuidv4 } from 'uuid'; // Mengimpor fungsi v4 dari paket uuid

export const uploadImages = async (files: Express.Multer.File[]): Promise<string[]> => {
    const uploadedImages: string[] = [];

    for (const file of files) {
        const uniqueFileName = `${uuidv4()}.${file.originalname.split('.').pop()}`; // Menghasilkan UUID dan menggunakan ekstensi file asli
        const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: 'auto', public_id: uniqueFileName }, // Mengatur public_id dengan UUID
            (error: any, result: any) => {
                if (error) {
                    console.error('Error uploading to Cloudinary:', error);
                } else {
                    uploadedImages.push(result.secure_url);
                }
            }
        );

        // Convert file buffer to stream and pipe it to upload stream
        const readableFileStream = new Readable();
        readableFileStream.push(file.buffer);
        readableFileStream.push(null);

        readableFileStream.pipe(uploadStream);
    }

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(uploadedImages);
        }, 1000); // Menunggu semua upload selesai
    });
};
