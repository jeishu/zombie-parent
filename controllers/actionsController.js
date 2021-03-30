const db = require("../models");
const moment = require("moment");

module.exports = {
  findActionsByDateRange: function (req, res) {
    db.Action
    .find(
      { 
        _id: req.params.id,
        endTime:
        {
          $gte: moment(req.query.startTime),
          $lt: moment(req.query.endTime)
           }
      },
      { sort: -1}
      )
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  },
  findActionsLastDay: function (req, res) {
    let yesterday = moment().subtract(24, "hours").toISOString();
    db.Action
    .find(
      {
        child: req.params.id,
        endTime: {
          $gte: yesterday
        }
      },
      { sort: -1}
    )
    .populate("child")
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Action
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Action
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Action
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Action
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
