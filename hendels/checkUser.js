export const MONGO_URI = 'mongodb://bogdan:1111111Q@ds157864.mlab.com:57864/todos'

const checkUser = async (req, res) => {
    const { authorization } = req.headers

    if(!authorization) {
        res.json(400, { message: 'invalid token!' })
    }

    res.json({ data: authorization })
}

export default { checkUser }