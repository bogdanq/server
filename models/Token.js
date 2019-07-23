import mongoose, { Schema } from "mongoose";

const TokenSchema = new Schema(
  {
    userEmail: String,
    token: String,
  },
  {
    timestamps: true,
  },
);

export const TokenModel = mongoose.model("Token", TokenSchema);
