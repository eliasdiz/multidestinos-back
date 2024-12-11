import multer from 'multer';
import path from 'path';

// Configuración de almacenamiento de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Carpeta donde se guardarán los archivos
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Asignar un nombre único al archivo
    }
});

// Aquí puedes agregar más configuraciones o validaciones, como el tipo de archivo o tamaño máximo
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['application/zip', 'application/x-zip-compressed', 'application/gpkg'];
    if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error('Invalid file type. Only GeoPackage files are allowed.'));
    }
    cb(null, true);
};

// Configuración de multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 50 * 1024 * 1024 }  // Limitar el tamaño del archivo (50MB en este caso)
});

export default upload;
