import UserController from '../models/Users'
import SummaryController from '../models/Summary'
import TokenController from '../models/Token'
import pick from 'lodash/pick'

const getUsers = (ctx) => {
  UserController.find().then((err, users) => {
    if(err) {
        ctx.res.send(err)
    } else {
        ctx.res.json(users)
    }
  }) 
}

const signUp = async (req, res) => {
  const { _id } = await UserController.create(pick(req.body, UserController.createFields))
  const user = await UserController.findOneWithPublicFields({ _id })
  
  res.json({ data: user })
}

const signIn = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.send(404, { status: 'email и пароль не найдены' })
  }

  const user = await UserController.findOne({ email })

  if (!user) {
    res.send(404, { status: 'email не найден' })
  }

  if (!user.comparePasswords(password)) {
    res.json(404, { status: 'Неверный пароль' })
  }

  const token = Math.random(1, 100000)

  const newUserToken = new TokenController ({
    userEmail: email,
    token: token
  })

  newUserToken.save().then(() => {
    res.send({ 
      data: user,
      token: token
    })
  })  

}

const deleteUser = (req, res) => {
  UserController.remove({
    _id: req.params.id
  }).then(user => {
    if(user) {
        res.json(200, { status: 'deleted' })
    } else {
        res.send(400, { status: 'error' })
    }
  })
}

const currentUser = async (req, res) => {
  try {
    const user = await UserController.findOne({ email: req.userEmail })
  
    res.send(user)
   } catch(e) {
    console.log(e)
   } 
}   

const getSummaries = async  (req, res) => {
  const { authorization } = req.headers
  const userEmail  = authorization

  const user = await SummaryController.find({ userEmail })
  
  if(user !== null) {
    res.json({ data: user })     
      
  } else {
    res.send(404, { status: 'user not found' })
  }
}

export default { signUp, signIn, deleteUser, getUsers, currentUser, getSummaries }

