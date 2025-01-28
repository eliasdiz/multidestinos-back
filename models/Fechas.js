import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        fechas: { type: String}
    },{
        versionKey: false
    }
)

const Fechas = mongoose.model('Fechas',schema)

export default Fechas