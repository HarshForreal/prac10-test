var express = require("express");

var PORT;
var Cloudant = require("@cloudant/cloudant");

if (process.env.PORT) {
  PORT = process.env.PORT;
} else {
  PORT = 8000;
}
var Cloudant = require("@cloudant/cloudant");
var url =
  "https://apikey-v2-1ccx9t83a8laojqvhrxps3q6ju1np7km1jvq38d2vvjz:ca8a4470599fa35c970f9b3b9a7d7760@2da779cb-344e-49a0-8bb8-d3f15f6e1d2a-bluemix.cloudantnosqldb.appdomain.cloud";
var username = "apikey-v2-1ccx9t83a8laojqvhrxps3q6ju1np7km1jvq38d2vvjz";
var password = "ca8a4470599fa35c970f9b3b9a7d7760";
var app = express();
const bodyParser = require("body-parser");
//const cors = require('cors');
//app.use(cors());
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
////////////
app.post("/insert", (req, res) => {
  const { name, email, database } = req.body;

  const data = {
    name: name,
    email: email,
  };
  ///////
  Cloudant(
    { url: url, username: username, password: password },
    function (err, cloudant, pong) {
      if (err) {
        return console.log("Failed to initialize Cloudant: " + err.message);
      }
      console.log(pong); // {"couchdb":"Welcome","version": ..

      cloudant
        .use(database)
        .insert({ name: name, email: email }, (err, data) => {
          if (err) {
            res.send(err);
          } else {
            res.send(data); // { ok: true, id: 'rabbit', ...
          }
        });
    }
  );
});

app.listen(PORT);
//console.log(message.getPortMessage() + PORT);
