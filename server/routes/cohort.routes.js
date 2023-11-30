const router = require("express").Router();
const mongoose = require("mongoose");
const Cohort = require("../models/Cohort.model");
//Creates a new cohort
router.post("/cohorts", (req, res, next) => {
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
    totalHours: req.body.totalHours,
    students: req.body.students,
  })
    .then(() => {
      res.send("A cohort was created!");
    })
    .catch((error) => {
      next(error);
    });
});

// retrieves all the cohorts
router.get("/cohorts", (req, res, next) => {
  Cohort.find({})
    .then((cohort) => {
      console.log("Retrieved cohort: ", cohort);
      res.json(cohort);
    })
    .catch((error) => {
      next(error);
    });
});

//Retrieves a specific cohort by id
router.get("/cohorts/:cohortId", (req, res, next) => {
  Cohort.find({ _id: req.params.cohortId })
    .populate("students")
    .then((cohortDetails) => {
      res.json(cohortDetails);
    })
    .catch((error) => {
      next(error);
    });
});

//Updates a specific cohort by id
router.put("/cohorts/:cohortId", (req, res, next) => {
  Cohort.findByIdAndUpdate(req.params.cohortId)
    .then((cohortDetails) => {
      res.json(cohortDetails);
    })
    .catch((error) => {
      next(error);
    });
});

//Deletes a specific cohort by id
router.delete("/cohorts/:cohortId", (req, res, next) => {
  Student.findByIdAndDelete(req.params.cohortId)
    .then((cohortDetails) => {
      res.json(cohortDetails);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
