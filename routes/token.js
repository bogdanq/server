import express from 'express'

const router = express.Router()

import mongoose from 'mongoose'

mongoose.Promise = Promise

import TokenController from '../controllers/TokenController'

import { MONGO_URI } from '../hendels/checkUser'

new Promise ((res, rej) => {
  mongoose
    .connect(MONGO_URI,  { useNewUrlParser: true }) 
    .then(mongodb => {
      res(mongodb)
        
    })
    .catch(err => {
      console.log('mongo error token')
    })
})

router
  .get('/', TokenController.getToken)
  .delete('/delete/:id', TokenController.delToken)
  .get('/userToken', TokenController.getTokenById)
    
export default router
