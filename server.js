import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import passport from 'passport'
import LocalStrategy from 'passport-local'

import routes from './routes'

const server = express()

server.use(cors())
server.use(logger("dev"))
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(passport.initialize())

for (let routeName in routes) {
  console.log(routeName)
  server.use("/" + routeName, routes[routeName])
}

export default server