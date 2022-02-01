const mongoose = require("mongoose");

const adressSchema = new mongoose.Schema({
  street: String,
  city: String,
});

const userSchema = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    min: 1,
    max: 100,
  },
  email: {
    type: String,
  },

  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },

  bestFriend: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },

  hobbies: [String],
  address: adressSchema,
});

module.exports = mongoose.model("User", userSchema);
