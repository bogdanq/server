import mongoose, { Schema } from 'mongoose'

const TokenSchema = new Schema(
    {
        userEmail: String,
        token: String
    },
    {
        timestamps: true
    }
)

const Token = mongoose.model('Token', TokenSchema)

export default Token