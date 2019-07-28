import mongoose, { Schema } from "mongoose";

const JobsSchema = new Schema(
  {
    userEmail: {
      type: String,
      required: "User id is required",
    },
    jobsName: {
      type: String,
      required: "jobsName is required",
      lowercase: true,
      trim: true,
    },
    companyName: {
      type: String,
      required: "companyName is required",
      lowercase: true,
      trim: true,
    },
    employment: {
      type: String,
      required: "employment is required",
      lowercase: true,
      trim: true,
    },
    experience: {
      type: String,
      required: "experience is required",
      lowercase: true,
      trim: true,
    },
    description: {
      type: [String],
      required: "description is required",
      lowercase: true,
      trim: true,
    },
    condition: {
      type: [String],
      required: "condition is required",
      lowercase: true,
      trim: true,
    },
    tags: {
      type: [String],
      required: "Tags is required",
      trim: true,
    },
    contacts: {
      type: [String],
      required: "contacts is required",
      trim: true,
    },
    comments: [
      {
        userName: {
          type: String,
          trim: true,
        },
        userEmail: {
          type: String,
          trim: true,
        },
        description: {
          type: String,
          trim: true,
        },
      },
      {
        timestamps: true,
      },
    ],
  },
  {
    timestamps: true,
  },
);

JobsSchema.statics.createFields = [
  "jobsName",
  "companyName",
  "employment",
  "experience",
  "description",
  "condition",
  "tags",
  "contacts",
  "comments",
];

export const JobsModel = mongoose.model("Jobs", JobsSchema);
