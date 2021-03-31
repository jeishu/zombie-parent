const db = require("../models");
const moment = require("moment");

module.exports = {
  findActionsByDateRange: function (req, res) {
    db.Action.find({
      _id: req.params.id,
      endTime: {
        $gte: moment(req.query.startTime),
        $lt: moment(req.query.endTime),
      },
    })
      .sort({ endTime: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findActionsLastDay: function (req, res) {
    let yesterday = moment().subtract(24, "hours").toISOString();
    db.Action.find(
      {
        child: req.params.id,
        endTime: {
          $gte: yesterday,
        },
      })
      .populate("child")
      .sort({ endTime: -1 })
      .exec(function (err, actions) {
        // console.log(JSON.stringify(actions, null, 2));
        if (err) return res.status(422).json(err);
        return res.json(actions);
      });
  },
  findActionsLastWeek: function (req, res) {
    let lastWeek = moment().subtract(168, "hours").toISOString();
    db.Action.find(
      {
        child: req.params.id,
        endTime: {
          $gte: lastWeek,
        },
      })
      .populate("child")
      .sort({ endTime: -1 })
      .exec(function (err, actions) {
        // console.log(JSON.stringify(actions, null, 2));
        if (err) return res.status(422).json(err);
        return res.json(actions);
      });
  },
  findActionsLastDayByName: function (req, res) {
    let yesterday = moment().subtract(24, "hours").toISOString();
    db.Action.find(
      {
        child: req.params.id,
        name: req.params.name,
        endTime: {
          $gte: yesterday,
        },
      })
      .populate("child")
      .sort({ endTime: -1 })
      .exec(function (err, actions) {
        // console.log(JSON.stringify(actions, null, 2));
        if (err) return res.status(422).json(err);
        return res.json(actions);
      });
  },
  findActionsLastWeekByName: function (req, res) {
    let lastWeek = moment().subtract(168, "hours").toISOString();
    db.Action.find(
      {
        child: req.params.id,
        name: req.params.name,
        endTime: {
          $gte: yesterday,
        },
      })
      .populate("child")
      .sort({ endTime: -1 })
      .exec(function (err, actions) {
        // console.log(JSON.stringify(actions, null, 2));
        if (err) return res.status(422).json(err);
        return res.json(actions);
      });
  },
  findById: function (req, res) {
    db.Action.findById(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Action.create(req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Action.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Action.findById({ _id: req.params.id })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
