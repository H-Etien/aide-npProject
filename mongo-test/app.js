//  faire pour que ça marche npm install mongoose
const mongoose = require("mongoose");

/*
    connection à la database, 
    port : 27017 par défaut
    nom du nouveau database sur mongoDB sera ce qu'on veut, ici watherverIWant

    !!! activer le serveur mongoDB avec mongod 
        pour Windows, le chemin est:            C:\Program Files\MongoDB\Server\5.0\bin> mongod
*/
const connect = () => {
  return mongoose.connect("mongodb://localhost:27017/whaterverIWant");
};

/*
    constante pour donner le format qui sera dans la base de donnée

    school: {
      type: String,
    },
    age: Number,
    c'est équivalent, mongoose comprend qu'il faut un type précis
*/
const student = new mongoose.Schema({
  firstName: String,
  lastName: {
    type: String,
    required: true,
    unique: true,
  },
  info: {
    school: {
      type: String,
    },
    age: Number,
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "school",
  },
});

const school = new mongoose.Schema({
  name: String,
});

/*
    .model("student", student)
    le "student" sera pluralisé dans mongoDB, donc deviendra students

    le 2ème student vient de la constante d'au-dessus
*/
const Student = mongoose.model("student", student);
const School = mongoose.model("school", school);

// connect() pour créer une nouvelle donnée
connect()
  .then(async (connection) => {
    const student = await Student.create({
      firstName: "noob",
      lastName: "new",
      info: {
        school: "newSchool",
        age: 2050,
      },
      school: school._id,
    });

    const found = await Student.find({
      firstName: "noob",
    });

    const school = await School.create({
      name: "first element",
    });

    const match = await Student.findById(student.id).populate("school").exec();
  })
  .catch((e) => console.error(e));
