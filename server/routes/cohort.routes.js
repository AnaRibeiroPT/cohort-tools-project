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
      console.log("Error creating a new cohort", error);
      res.send("Error creating a new cohort");
    });
});

// retrieves all the cohorts
router.get("/cohorts", (req, res) => {
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

//Retrieves a specific cohort by id
router.get("/cohorts/:cohortId", (req, res, next) => {
  Cohort.find({ _id: req.params.cohortId })
    .populate("students")
    .then((cohortDetails) => {
      res.json(cohortDetails);
    })
    .catch((error) => {
      console.log("Error retrieving the cohort details", error);
      res.send("Error retrieving the cohort details");
    });
});

//Updates a specific cohort by id
router.put("/cohorts/:cohortId", (req, res, next) => {
  Cohort.findByIdAndUpdate(req.params.cohortId)
    .then((cohortDetails) => {
      res.json(cohortDetails);
    })
    .catch((error) => {
      console.log("Error updating the cohort details", error);
      res.send("Error updating the cohort details");
    });
});

//Deletes a specific cohort by id
router.delete("/cohorts/:cohortId", (req, res, next) => {
  Student.findByIdAndDelete(req.params.cohortId)
    .then((cohortDetails) => {
      res.json(cohortDetails);
    })
    .catch((error) => {
      console.log("Error deleting the cohort", error);
      res.send("Error deleting the cohort");
    });
});

module.exports = router;
