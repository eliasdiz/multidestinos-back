import mongoose from "mongoose";





mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log('conectado a la DB!!!')
    })
    .catch((error) => console.log(error) )