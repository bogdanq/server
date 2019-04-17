import express from 'express'

const router = express.Router()

import mongoose from 'mongoose'

mongoose.Promise = Promise

import SummaryController from '../controllers/SummaryController'

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
  .get('/', SummaryController.searchSummary)
  .get('/getByEmail/:id', SummaryController.getByEmail)
  .post('/add', SummaryController.addSummary)
  .delete('/delete/:id', SummaryController.delSummary)
  .put('/update/:id', SummaryController.updateSummary)
  .put('/addComments', SummaryController.addComments)
  .put('/deleteComments', SummaryController.deleteComments)

export default router
