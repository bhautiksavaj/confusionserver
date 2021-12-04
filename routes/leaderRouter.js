const express = require("express");
const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
const Leaders = require("../models/leaders");

var leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

/*********************** For Leaders *************************/
leaderRouter
  .route("/")
  .get(function (req, res, next) {
    Leaders.find({})
      .then(
        (leaders) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(leaders);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })

  .post(function (req, res, next) {
    Leaders.create({ ...req.body, birthDate: new Date(req.body.birthDate) })
      .then(
        () => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json("Leader inserted");
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })

  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /leaders");
  })

  .delete(function (req, res, next) {
    Leaders.deleteMany()
      .then(
        (response) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json("All leaders are deleted successfully");
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

leaderRouter
  .route("/:leaderId")

  .get(function (req, res, next) {
    Leaders.findById(req.params.leaderId)
      .then(
        (leader) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(leader);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })

  .put(function (req, res, next) {
    Leaders.findByIdAndUpdate(
      req.params.leaderId,
      { $set: { ...req.body, birthDate: new Date(req.body.birthDate) } },
      { new: true }
    )
      .then(
        (leader) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(leader);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })

  .delete(function (req, res, next) {
    Leaders.findByIdAndDelete(req.params.leaderId).then(() => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json("Leader delete successfully");
    });
  });

module.exports = leaderRouter;
