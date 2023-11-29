const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const cohorts = require("./api/cohorts.json");
const students = require("./api/students.json");
const cors = require("cors");
const mongoose = require("mongoose");
const Cohort = require("./models/Cohort.model");
const Student = require("./models/Student.model");

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:

app.use(cors({ origin: ["http://localhost:5005/"] }));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.get("/api/cohorts", (req, res, next) => {
  res.json(cohorts);
});

app.get("/api/students", (req, res, next) => {
  res.json(students);
});

app.get("/cohorts", (req, res) => {
  Cohort.find({})
    .then((cohort) => {
      console.log("Retrieved cohort: ", cohort);
      res.json(cohort);
    })
    .catch((error) => {
      console.error("Error while retrieving cohort: ", error);
      res.status(500).send({ error: "Failed to retrieve cohort" });
    });
});

app.get("/students", (req, res) => {
  Student.find({})
    .then((student) => {
      console.log("Retrieved student: ", student);
      res.json(student);
    })
    .catch((error) => {
      console.error("Error while retrieving student: ", error);
      res.status(500).send({ error: "Failed to retrieve student" });
    });
});

//Creates a new student
app.post("/api/students", (req, res, next) => {
  Student.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    linkedinUrl: req.body.linkedinUrl,
    languages: req.body.languages,
    program: req.body.program,
    background: req.body.background,
    image: req.body.image,
    cohort: req.body.cohort,
    projects: req.body.projects,
  })
    .then(() => {
      res.send("A student was created!");
    })
    .catch((error) => {
      console.log("Error creating a new student", error);
      res.send("Error creating a new student");
    });
});

//Retrieves all of the students for a given cohort
app.get("/api/students/cohort/:cohortId", (req, res, next) => {
  Student.findById(req.params.cohortId)
  .then((studentsArr) => {
    res.json(studentsArr)
  })
  .catch((error) => {
    console.log("Error retrieving all of the students for a given cohort", error);
    res.send("Error retrieving all of the students for a given cohort");
  })
})

//Retrieves a specific student by id
app.get("/api/students/:studentId", (req, res, next) => {
  Student.findById(req.params.studentId)
  .then((studentDetails) => {
    res.json(studentDetails)
  })
  .catch((error) => {
    console.log("Error retrieving the students details", error);
    res.send("Error retrieving the students details");
  })
})

//Updates a specific student by id
app.put("/api/students/:studentId", (req, res, next) => {
  Student.findByIdAndUpdate(req.params.studentId)
  .then((studentDetails) => {
    res.json(studentDetails)
  })
  .catch((error) => {
    console.log("Error updating the students details", error);
    res.send("Error updating the students details");
  })
})

//Deletes a specific student by id
app.delete("/api/students/:studentId", (req, res, next) => {
  Student.findByIdAndDelete(req.params.studentId)
  .then((studentDetails) => {
    res.json(studentDetails)
  })
  .catch((error) => {
    console.log("Error deleting the student", error);
    res.send("Error deleting the student");
  })
})

//Creates a new cohort
app.post("/api/cohorts", (req, res, next) => {
  Cohort.create({
    inProgress: req.body.inProgress,
    cohortSlug: req.body.cohortSlug,
    cohortName: req.body.cohortName,
    program: req.body.program,
    campus: req.body.campus,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    programManager: req.body.programManager,
    leadTeacher: req.body.leadTeacher,
    totalHours: req.body.totalHours
  })
    .then(() => {
      res.send("A cohort was created!");
    })
    .catch((error) => {
      console.log("Error creating a new cohort", error);
      res.send("Error creating a new cohort");
    });
});

//Retrieves a specific cohort by id
app.get("/api/cohorts/:cohortId", (req, res, next) => {
  Cohort.findById(req.params.cohortId)
  .then((cohortDetails) => {
    res.json(cohortDetails)
  })
  .catch((error) => {
    console.log("Error retrieving the cohort details", error);
    res.send("Error retrieving the cohort details");
  })
})

//Updates a specific cohort by id
app.put("/api/cohorts/:cohortsId", (req, res, next) => {
  Cohort.findByIdAndUpdate(req.params.cohortId)
  .then((cohortDetails) => {
    res.json(cohortDetails)
  })
  .catch((error) => {
    console.log("Error updating the cohort details", error);
    res.send("Error updating the cohort details");
  })
})

//Deletes a specific cohort by id
app.delete("/api/cohorts/:cohortsId", (req, res, next) => {
  Student.findByIdAndDelete(req.params.cohortId)
  .then((cohortDetails) => {
    res.json(cohortDetails)
  })
  .catch((error) => {
    console.log("Error deleting the cohort", error);
    res.send("Error deleting the cohort");
  })
})

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
