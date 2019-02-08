import SummaryModel from '../models/Summary'
import pick from 'lodash/pick'
import TokenController from '../models/Token'
import helpers from './helpers'

const addSummary = async (req, res) => {
    const { authorization } = req.headers  

    if(authorization) {  
        const token = await  TokenController.find({ token: authorization })
        if(token) {
            const { _id } = await SummaryModel.create({
              ...pick(req.body, SummaryModel.createFields),
              userEmail: token[0].userEmail
            })
        
            const summary = await SummaryModel.findOne({ _id })
        
            res.json({ data: summary })     
        } else {
          res.send(404, { status: 'invalid token2' })
        }
        
    } else {
      res.send(404, { status: 'invalid token' })
    }
}

const delSummary = async (req, res) => {
  const  _id = req.params.id
  const  user = req.headers.authorization
  const summary = await SummaryModel.findOne({ _id })
  const token = await  TokenController.find({ token: user })

  if(user) {
    if(summary.userEmail !== token[0].userEmail || token[0].userEmail === undefined) {
      res.send(403, { message: 'forbidden summary with id dont belong user with id' })
    } else {
        SummaryModel.remove({
          _id: req.params.id
        }).then(summary => {
            if(summary) {
              res.json(200, { id: _id })
            } else {
              res.send(400, { status: 'summary id is not defined' })
            }
        })
    }
  } else {
    res.send(404, { status: 'user not found' })
  }
}

const updateSummary = async (req, res) => {
  const  _id = req.params.id
  const  { authorization } = req.headers

  const token = await  TokenController.find({ token: authorization })
  const summary = await SummaryModel.findOne({ _id })

  if(token.length < 1 ) {
    res.send(404, { message: 'invalid token' })
  }

  if(summary.userEmail !== token[0].userEmail) {
    res.send(403, { message: 'forbidden summary with id dont belong user with id' })
  }

  const newData = pick(req.body, SummaryModel.createFields)

  summary.set(newData)

  const updateSummary = await summary.save()

  res.json({ data: updateSummary })
}

const searchSummary = async (req, res) => {
  const MAX_SIZE = 10
  const PAGE = 1
  const queryParams = pick(req.query, ['title', 'tags', 'size', 'page'])

  const filter = {
    title: queryParams.title ? queryParams.title : '',
    tags: queryParams.tags ? queryParams.tags.split(',') : [],
    size: parseInt(queryParams.size),
    page: parseInt(queryParams.page)
  }

  if(!filter.size || filter.size > MAX_SIZE) {
    filter.size = MAX_SIZE
  }

  if(!filter.page) {
    filter.page = PAGE
  }

  const { summaries, ...rest } = await helpers.search(filter)

  res.json({
    data: summaries,
    filter,
    ...rest
  })
}


const getByEmail = async (req, res) => {
  const  id = req.params.id
  const  date = req.params.date
  const  user = req.headers.authorization
  const summary = await SummaryModel.find({ userEmail: id, createdAt: date })

  res.json(200, { summary })
}

export default  { addSummary, delSummary, updateSummary, searchSummary, getByEmail }