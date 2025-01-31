import Opciones from "../models/Opciones.js";

const controllers = {

    crearActualizar: async (req, res, next) => {
        try {
            const { opcion, tipoRespuesta, respuesta } = req.body;

            let opcionesDoc = await Opciones.findOne();

            if (opcionesDoc) {
                let opcionExiste = opcionesDoc.opciones.find(item => item.opcion === opcion)
                if(opcionExiste){
                    opcionExiste.tipoRespuesta = tipoRespuesta
                    opcionExiste.respuesta = respuesta
                    await opcionesDoc.save()
                    return res
                        .status(200)    
                        .json({message: 'opcion actualizada!!!', opcionExiste})
                }else{
                    opcionesDoc.opciones.push({opcion,tipoRespuesta,respuesta})
                    await opcionesDoc.save()
                    return res.json({message: 'Opcion creada'})
                }
            }else{
                opcionesDoc = await Opciones.create({
                    opciones: [{ opcion, tipoRespuesta, respuesta }]
                });
                return res
                    .status(201)
                    .json({ message: "Opción creada en nuevo documento"})
            }
        } catch (error) {
            next(error);
        }
    },

    getOpciones: async (req,res,next) => {
        try {
            let opciones = await Opciones.find()
            return res
                .status(200)
                .json({opciones})
        } catch (error) {
            next(error)
        }
    }
};

export default controllers;
