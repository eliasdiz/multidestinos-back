import Descripcion from "../models/Descripcion.js";


const controller = {

    descripcion: async (req,res,next) => {
        let data = {
            destino: req.body.destino || 'destino',
            descripcion: req.body.descripcion || 'descripcion'
        }
        try {
            let descripcion = await Descripcion.findOneAndUpdate(
                {},
                data,
                {new: true, upsert: true}
            )
            return res
                .status(200)
                .json({
                    message: descripcion ? 'descripcion creada' : 'descripcion actualizada',
                    descripcion
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

export default controller