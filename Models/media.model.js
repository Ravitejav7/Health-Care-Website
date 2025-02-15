import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const MediaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    media: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],

  
      postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
     
 
  },
  {
    timestamps: true,
  }
);

const Media = mongoose.model("Media", MediaSchema);

export default Media;
