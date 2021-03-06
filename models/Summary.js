import mongoose, { Schema } from "mongoose";

const SummarySchema = new Schema(
  {
    userEmail: {
      type: String,
      required: "User id is required",
    },
    title: {
      type: String,
      required: "Title is required",
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: "Description is required",
      trim: true,
    },
    tags: {
      type: [String],
      required: "Tags is required",
      trim: true,
    },
    history: [
      {
        companyName: {
          type: String,
          required: "Company name is required",
          trim: true,
        },
        title: {
          type: String,
          required: "Company name is required",
          trim: true,
        },
        startDate: {
          type: String,
          trim: true,
        },
        endDate: {
          type: String,
          trim: true,
        },
        currentWork: {
          type: Boolean,
          default: false,
        },
        description: {
          type: String,
          required: "Description is required",
          trim: true,
        },
      },
    ],
    education: [
      {
        year: {
          type: String,
        },
        institution: {
          type: String,
          trim: true,
        },
      },
    ],
    language: [
      {
        title: {
          type: String,
          trim: true,
        },
        description: {
          type: String,
          trim: true,
        },
      },
    ],
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

SummarySchema.statics.createFields = [
  "title",
  "phone",
  "description",
  "history",
  "tags",
  "education",
  "language",
  "comments",
];

export const SummaryModel = mongoose.model("Summary", SummarySchema);
