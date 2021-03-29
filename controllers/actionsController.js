const db = require("../models");

module.exports = {
  findActionsByDateRange: function (req, res) {
    db.Action
    .findAll(
      { 
        _id: req.params.id,
        endTime:
        {
          $gte: new Date(new Date(req.query.startDate).setHours(00, 00, 00)),
          $lt: new Date(new Date(req.query.endDate).setHours(23, 59, 59))
           }
      },
      { sort: -1}
      )
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  },
  findActionsLastDay: function (req, res) {
    db.Action
    .findAll(
      {
        _id: req.params.id,
        endtime: {
          $gte: new Date(new Date().getTime() - (24 * 60 * 60 * 1000))
        }
      },
      { sort: -1}
    )
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
