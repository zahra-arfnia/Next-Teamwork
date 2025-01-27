import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  answer: {
    type: Array,
    default: [],
  },
});

export default mongoose.models.Question ||
  mongoose.model("Question", questionSchema);
