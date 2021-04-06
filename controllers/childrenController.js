const db = require("../models");
const moment = require("moment");
const { find } = require("../models/User");

module.exports = {
  findById: function (req, res) {
    db.Child.findById(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Child.create(req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Child.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Child.findById({ _id: req.params.id })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  checkCode: function (req, res) {
    db.Child.findOne({ shareCode: { code: req.params.code } }).then(
      (dbModel) => {
        let checkIfExists = req.body.userData.child.filter(
          (child) => child === dbModel._id
        );
        if (
          !checkIfExists &&
          dbModel.shareCode.codeTimeStamp.isAfter(
            moment().subtract(15, "minutes")
          )
        ) {
          db.User.findOneAndUpdate(
            { _id: req.body.userData._id },
            {
              ...req.body.userData,
              child: [...req.body.userData.child, dbModel._id],
              activeChild: [...req.body.userData.child, dbModel._id],
              lastViewedChild: dbModel._id,
            },
            { new: true }
          )
            .then((dbModel) => res.json(dbModel))
            .catch((err) => res.status(422).json(err));
        }
      }
    );
  },
};
