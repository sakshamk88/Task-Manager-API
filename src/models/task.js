const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    Description: {
      type: String,
      trim: true,
      required: true,
    },
    Completed: {
      type: Boolean,
      default: false,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Tasks = mongoose.model("Tasks", taskSchema);

module.exports = Tasks;
