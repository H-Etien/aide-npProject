const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing");

//mailchimp config
mailchimp.setConfig({
  apiKey: "3253ea490cc1950c9674114cc3954183-us20",
  server: "us20",
});

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//page principal
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  // ajouter le nouveau membre dans la liste email de mailchimp
  const addMembers = async () => {
    const response = await mailchimp.lists.addListMember("095a6acd61", {
      email_address: email,

      status: "subscribed",

      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
      },
    });
  };

  //fufill promise, une fois la promesse faite, envoyer sur la page de succès ou erreur
  addMembers().then(
    (f) => {
      console.log("Sucess");
      res.sendFile(__dirname + "/sucess.html");
    },
    (r) => {
      console.log("not scuess");
      res.sendFile(__dirname + "/failure.html");
    }
  );
});

//si la page n'a pas marchée
app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server has started");
});

// pas oublier!!!! :: npm install @mailchimp/mailchimp_marketing

// APIKEY
// 3253ea490cc1950c9674114cc3954183-us20

// idlist
// 095a6acd61
