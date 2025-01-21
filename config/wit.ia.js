import axios from "axios"

const WIT_API_URL = process.env.WIT_API_URL
const WITIA_SERVER_TOKEN = process.env.WITIA_SERVER_TOKEN


const witClient = axios.create({
    baseURL: WIT_API_URL,
    headers: {
        Authorization: `Bearer ${WITIA_SERVER_TOKEN}`,
        "Content-Type": "application/json"
    }
})

const getWitResponse = async (messsage) => {
    try {
        const response = await witClient.get('',{params:{q: messsage}})
        return response.data
    } catch (error) {
        console.log(error)
        return null
    }
}

export default getWitResponse