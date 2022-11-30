const mongoose = require("mongoose");

const post = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  author: String,
  body: String,
  tags: [String],
  creationDate: Date,
});

module.exports = mongoose.model("Post", post);
