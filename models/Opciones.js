import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        opciones: [
            {
                opcion: {type: String},
                tipoRespuesta: {type: String},
                respuesta: {type: String}
            }
        ]
    },{
        versionKey: false
    }
)

const Opciones = mongoose.model('Opciones',schema)

export default Opciones