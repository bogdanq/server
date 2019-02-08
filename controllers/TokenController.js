import TokenController from '../models/Token'

const getToken = (ctx) => {
    TokenController.find().then((err, users) => {
        if(err) {
            ctx.res.send(err)
        } else {
            ctx.res.json(users)
        }
    }) 
}

const delToken = (req, res) => {
    TokenController.remove({
        _id: req.params.id
    }).then((token) => {
        if(token) {
            res.json(200,{ message: 'deleted token' })
        } else {
            res.json(404,{ message: 'invalid token' })
        }
    }) 
}

const getTokenById = (req, res) => {
    const { authorization } = req.headers
    const token  = authorization

    TokenController.find({ token }).then((err, userToken) => {
        if(!userToken) {
            res.send(err)
        } else {
            res.json(users)
        }
    }) 
}

export default { getToken, delToken, getTokenById }