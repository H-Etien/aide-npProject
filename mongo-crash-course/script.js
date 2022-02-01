const mongoose = require("mongoose");
const User = require("./User");

mongoose.connect("mongodb://localhost:27017/crash-couse-DB");

run();
async function run() {
  //   const user = await User.create({
  //     name: "Dark-Etien",
  //     age: 28,
  //     hobbies: ["Coding", "Gaming"],
  //     address: {
  //       street: "peche",
  //       city: "auder",
  //     },
  //   });

  const userQuery = await User.where("age").gt("0").populate("bestFriend");
  console.log(userQuery);
}
