const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const cohorts = require("./api/cohorts.json");
const students = require("./api/students.json");
const cors = require("cors");
const mongoose = require("mongoose");

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...


// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// MIDDLEWARE
// Research Team - Set up CORS middleware here:

app.use(cors({origin:["http://localhost:5005/"]}))
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.get("/api/cohorts", (req, res, next) => {
  res.json(cohorts)
})

app.get("/api/students", (req, res, next) => {
  res.json(students)
})

const Cohorts = require("./models/Cohorts.model");
const Students = require("./models/Students.model");

app.get("/cohorts", (req, res) => {
  Cohorts.find({})
  .then((cohort) => {
    console.log("Retrieved cohort: ", cohort);
    res.json(cohort);
  })
  .catch((error) => {
    console.error("Error while retrieving cohort: ", error);
    res.status(500).send({error: "Failed to retrieve cohort"}) 
  })
})

app.get("/students", (req, res) => {
  Students.find({})
  .then((student) => {
    console.log("Retrieved student: ", student);
    res.json(student);
  })
  .catch((error) => {
    console.error("Error while retrieving student: ", error);
    res.status(500).send({error: "Failed to retrieve student"}) 
  })
})

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err));

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
