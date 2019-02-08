import TodoModel from '../models/Todo'

const get = (req, res) => {
    TodoModel.find().then((err, posts) => {
        if(err) {
            res.send(err)
         } 
        res.json(posts)
    })
}

const getByText  = (req, res) => {
    TodoModel.find({
        text: req.params.param
    }).then(post => {
        if(post) {
            res.json(post)
        } else {
            res.send({ status: 'not found' })
        }
    })
}

const create = (req, res) => {
    const data = req.body

    const post = new TodoModel({
        text: data.text,
        isCompleted: data.isCompleted
    })
    
    post.save().then(() => {
        res.send({ status: 'OK' })
    })
}

const update = (req, res) =>  {
    console.log(req.body)
    TodoModel.findByIdAndUpdate(req.params.param, { $set: req.body }, err => {
        if(err) {
            res.send(err)
        } 
    
        res.json({ status: 'update' })
    })
}

const del = (req, res) =>{
    TodoModel.remove({
        _id: req.params.id
    }).then(posts => {
        if(posts) {
            res.json({ status: 'deleted' })
        } else {
            res.json({ status: 'error' })
        }
    })
}

export default  { get, getByText, create, update, del }
