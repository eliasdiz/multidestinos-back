import responses from "../responses.js"


const controller = {

    chat: (req,res,next) => {
        const { message } = req.body
        try {
            let response = responses[message.toLowerCase()] || responses.default
            return res  
                .status(200)
                .json({ reply: response})
        } catch (error) {
            next(error)
        }
    }

}

export default controller