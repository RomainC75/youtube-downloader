import {Schema, model} from 'mongoose'

const downloadSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    format: {
        type: String,
        enum: ['video', 'audio'],
        required: true
    },
    isDone: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

const Download = model("video", downloadSchema);

export default Download