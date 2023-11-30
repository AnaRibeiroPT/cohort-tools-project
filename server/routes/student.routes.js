const Student = require("../models/Student.model");

const router = require("express").Router();

const mongoose = require("mongoose");

router.get("/students", (req, res, next) => {
  Student.find({})
    .then((student) => {
      console.log("Retrieved student: ", student);
      res.json(student);
    })
    .catch((error) => {
      next(error);
    });
});

//Creates a new student
router.post("/students", (req, res, next) => {
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
      next(error);
    });
});

//Retrieves all of the students for a given cohort
router.get("/students/cohort/:cohortId", (req, res, next) => {
  Student.find({ cohort: req.params.cohortId })
    .then((studentsArr) => {
      res.json(studentsArr);
    })
    .catch((error) => {
      next(error);
    });
});

//Retrieves a specific student by id
router.get("/students/:studentId", (req, res, next) => {
  console.log(req.params.studentId);
  Student.find({ _id: req.params.studentId })
    .then((studentDetails) => {
      res.json(studentDetails);
    })
    .catch((error) => {
      next(error);
    });
});

//Updates a specific student by id
router.put("/students/:studentId", (req, res, next) => {
  Student.findByIdAndUpdate(req.params.studentId)
    .then((studentDetails) => {
      res.json(studentDetails);
    })
    .catch((error) => {
      next(error);
    });
});

//Deletes a specific student by id
router.delete("/students/:studentId", (req, res, next) => {
  Student.findByIdAndDelete(req.params.studentId)
    .then((studentDetails) => {
      res.json(studentDetails);
    })
    .catch((error) => {
      next(error);
    });
});


module.exports = router