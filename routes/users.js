import express from 'express'
const router = express.Router()

import mongoose from 'mongoose'

import UserController from '../controllers/UserController'

import { MONGO_URI } from '../hendels/checkUser'

import helpers from '../controllers/helpers'


new Promise((res, rej) => {
  mongoose
    .connect(MONGO_URI,  { useNewUrlParser: true })
    .then(mongodb => {
      res(mongodb)
      console.log('connected mongo users')
    })
    .catch(err => {
      console.log('mongo not connect users')
    })
}) 

router
  .get('/', UserController.getUsers)
  .post('/signup', UserController.signUp)
  .post('/signin', UserController.signIn)
  .delete('/delete/:id', UserController.deleteUser)
  .get('/current-user', helpers.privateUser, UserController.currentUser)
  // .get('/current-user/:id', UserController.currentUser)
  .get('/summaries', UserController.getSummaries)
  .put('/favoriteSummary', UserController.toggleSummary)
  .put('/getSummary', UserController.getSummary)

export default router