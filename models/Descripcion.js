import mongoose from 'mongoose'

const schema = new mongoose.Schema(
    {
        destino: { type: String},
        descripcion: { type: String},
    },{
        versionKey: false
    }
)

const Descripcion = mongoose.model('Descripcion', schema)

export default Descripcion