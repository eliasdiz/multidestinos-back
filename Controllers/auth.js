import mongoose from 'mongoose'

const controller  = {
    
    sesion: async (req,res,next) => {
        const db = mongoose.connection.db;
        const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: 'whatsapp-RemoteAuth-cuchoBot' });
        const cursor = bucket.find({ filename: 'RemoteAuth-cuchoBot.zip' });
        try {
            const files = await cursor.toArray();
            if(files.length > 0){
                return res
                    .status(200)
                    .json({
                        message: 'sesion encontrada',
                        status: true
                    })
            }else{
                return res
                    .status(400)
                    .json({
                        message: 'sesion no encontrada',
                        status: false
                    })
            }
        } catch (error) {
            next(error)
        }

    }
}

export default controller