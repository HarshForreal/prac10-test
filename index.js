var express = require("express");

var PORT;
var Cloudant = require("@cloudant/cloudant");

if (process.env.PORT) {
  PORT = process.env.PORT;
} else {
  PORT = 8000;
}

var url = "https://<your-cloudant-url>";
var app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/insert", (req, res) => {
  const { database, name, email, age, phone } = req.body; // Updated to include age and phone

  // Assuming you want to include age and phone number in your data
  const data = {
    name: name,
    email: email,
    age: age, // New field
    phone: phone, // New field
  };

  // Connect to Cloudant with URL, username, and password
  var cloudant = Cloudant({ url: url }, function (err, cloudant, pong) {
    if (err) {
      return console.log("Failed to initialize Cloudant: " + err.message);
    }
    console.log(pong); // Success message from Cloudant

    cloudant.use(database).insert(data, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(result); // Send back the success response from Cloudant
      }
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
