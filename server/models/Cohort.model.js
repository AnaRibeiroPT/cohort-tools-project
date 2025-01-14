const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cohortSchema = new Schema ({
  inProgress: Boolean,
  cohortSlug: String,
  cohortName: String,
  program: String,
  campus: String,
  startDate: Date,
  endDate: Date,
  programManager: String,
  leadTeacher: String,
  totalHours: Number,
  students: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student"
  }
});

const Cohort = mongoose.model("Cohort", cohortSchema);

module.exports = Cohort;