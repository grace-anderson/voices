const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const thoughtSchema = new Schema({
  storyTitle: {
    type: String,
    required: "You need to add a title!",
    minlength: 1,
    maxlength: 140,
    trim: true,
  },
  storyIntro: {
    type: String,
    required: "You need to introduce your story",
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  myStory: {
    type: String,
    required: "Write your story",
    minlength: 1,
  },
  thoughtAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
