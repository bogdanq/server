import mongoose, { Schema } from 'mongoose'

const PostSchema = new Schema(
    {
        text: String,
        isCompleted: Boolean
    },
    {
        timestamps: true
    }
)

const Todo = mongoose.model('Todo', PostSchema)

export default Todo