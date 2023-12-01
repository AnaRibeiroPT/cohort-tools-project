const User = require("../models/User.model");

const router = require("express").Router();

router.get("/user/:userId", (req, res, next) => {
  console.log(req.params.userId);
  User.find({ _id: req.params.userId })
    .then((userDetails) => {
      res.json(userDetails);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router