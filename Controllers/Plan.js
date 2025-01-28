import Descripcion from "../models/Descripcion.js";
import Fechas from '../models/Fechas.js'

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
                {upsert: true}
            )
            return res
                .status(200)
                .json({
                    message: descripcion ? 'descripcion actualizada' : 'descripcion creada',
                    descripcion
            })
        } catch (error) {
            // console.log(error)
            next(error)
        }
    },

    getDescripcion: async (req,res,next) => {
        try {
            let descripcion = await Descripcion.findOne()
            return res
                .status(200)
                .json({ descripcion})
        } catch (error) {
            next(error)
        }
    },

    fechas: async (req,res,next) => {
        let data = {
            fechas: req.body.fechas || 'fechas'
        }
        try {
            let fechas = await Fechas.findOneAndUpdate(
            {},
            data,
            {upsert: true}
            )
            return res 
                .status(200)
                .json({
                    message: fechas ? 'fechas actualizadas' : 'fechas creadas exitosamente',
                    fechas
                })
        } catch (error) {
            next(error)
        }
    },

    getFechas: async (req,res,next) => {
        try {
            let fechas = await Fechas.findOne()
            return res
                .status(200)
                .json({ fechas })
        } catch (error) {
            next(error)
        }
    }
}

export default controller