import express from 'express'

const router = express.Router()

import mongoose from 'mongoose'

mongoose.Promise = Promise

import TodoController from '../controllers/TodoController'

import { MONGO_URI } from '../hendels/checkUser'

new Promise ((res, rej) => {
    mongoose
        .connect(MONGO_URI,  { useNewUrlParser: true }) 
        .then(mongodb => {
            res(mongodb)
            
        })
        .catch(err => {
            console.log('mongo error todo')
        })
})

router
    .get('/', TodoController.get)
    .delete('/delete/:id', TodoController.del)
    .get('/:param', TodoController.getByText)
    .put('/update/:param', TodoController.update)
    .post('/create', TodoController.create)
    

export default router
