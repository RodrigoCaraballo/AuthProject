import { v2 as cloudinary } from 'cloudinary'
import { Observable, from, of } from 'rxjs';
import { extname } from 'path';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const deleteOldImage = (url: string): Observable<string> => {
    const parts = url.split('/');
    const imageNameWithExtension = parts[parts.length - 1];
    const imageName = imageNameWithExtension.split('.')[0];
    return from(cloudinary.uploader.destroy(imageName))
}

const verifyImage = (path: string): Observable<boolean> => {
    const ext = extname(path);
    const imgExt = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];

    
    if(!imgExt.includes(ext)) return of(false);

    return of(true)
}

export { cloudinary, deleteOldImage, verifyImage }