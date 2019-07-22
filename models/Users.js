import mongoose, { Schema } from "mongoose";

import uniqueValidator from "mongoose-unique-validator";

mongoose.plugin(uniqueValidator);

const UsersSchema = new Schema(
  {
    email: {
      type: String,
      unique: "User email already",
      lowercase: true,
      required: "Email is required",
      trim: true,
    },
    password: {
      type: String,
      required: "Password is required",
      trim: true,
    },
    firstName: {
      type: String,
      lowercase: true,
      required: "first name is required",
      trim: true,
    },
    lastName: {
      type: String,
      lowercase: true,
      required: "lastName is required",
      trim: true,
    },
    favoriteSummry: {
      type: [String],
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

UsersSchema.statics.createFields = [
  "email",
  "password",
  "firstName",
  "lastName",
  "favoriteSummry",
];

UsersSchema.statics.findOneWithPublicFields = function(params, cb) {
  return this.findOne(params, cb).select({ password: 0, _id: 0, __v: 0 });
};

UsersSchema.methods.comparePasswords = function(password) {
  if (password === this.password) {
    return true;
  } else {
    return false;
  }
};

const Users = mongoose.model("Users", UsersSchema);

export default Users;
