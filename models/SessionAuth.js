import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        clientId: { type: String},
        sessionData: { type: Object}
    },{
        versionKey: false,
        timestamps: true
    }
)

const SessionAuth = mongoose.model('SessionAuth',schema)

export default SessionAuth