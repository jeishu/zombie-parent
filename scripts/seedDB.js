const mongoose = require("mongoose");
const db = require("../models");
const moment = require("moment");

// This file empties the Books collection and inserts the books below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/zombieparent");

const childSeed = [
  {
    name: "Lil Testy",
    birthDate: moment().subtract(1, "days"),
  },
];

const userSeed = [
  {
    name: "Mama Testy",
    email: "mama@test.com",
    password: "isthisatest",
    joinDate: moment().subtract(1, "days"),
    lastLogin: moment().subtract(1, "days"),
    child: [],
    activeChild: [],
    lastViewedChild: {},
    careOptions: {
      showBottle: true,
      showNurse: true,
      showNap: true,
      showDiaper: true,
    },
    statsView: {
      lastView: "default",
      lastRange: "week",
    },
  },
];

const actionSeed = [
  {
    name: "diaper",
    beginTime: moment().subtract(10, "hours"),
    endTime: moment().subtract(10, "hours"),
    diaperContents: {
      pee: true,
    },
    endedByUser: true,
  },
  {
    name: "diaper",
    beginTime: moment().subtract(4, "hours"),
    endTime: moment().subtract(4, "hours"),
    diaperContents: {
      pee: true,
      poo: true,
    },
    endedByUser: true,
  },
  {
    name: "bottle",
    beginTime: moment().subtract(3, "hours"),
    endTime: moment().subtract(3, "hours"),
    foodOz: 2,
    endedByUser: true,
  },
  {
    name: "nurse",
    beginTime: moment().subtract(90, "minutes"),
    endTime: moment().subtract(80, "minutes"),
    whichBreast: {
      left: true,
    },
    endedByUser: true,
  },
  {
    name: "sleep",
    beginTime: moment().subtract(4, "hours"),
    endTime: moment().subtract(3, "hours"),
    endedByUser: true,
  },
];

let userId;
let childId;

db.User.remove({})
  .then(() => {
    db.User.collection
      .insertMany(userSeed)
      .then((data) => {
        console.log(data.result.n + " User records inserted!");
        // console.log(JSON.stringify(data));
        console.log(data.ops[0]._id + " is userId");
        userId = data.ops[0]._id;
      })
      .catch((error) => {
        console.error(error);
        process.exit(1);
      });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

db.Child.remove({})
  .then(() => db.Child.collection.insertMany(childSeed))
  .then((data) => {
    console.log(data.result.n + " Child records inserted!");

    db.Child.findOne({ name: "Lil Testy" })
      .then((data) => {
        console.log(data);
        console.log(data._id + " is childId");
        childId = data._id;

        db.User.findOneAndUpdate(
          { name: "Mama Testy" },
          {
            lastViewedChild: {
              _id: childId,
            },
            $push: {
              child: {
                _id: childId,
              },
              activeChild: {
                _id: childId,
              },
            },
          },
          {
            new: true,
          }
        )
          .then((data) => {
            console.log(data);
            db.Action.remove({}).then(() => {
              db.Action.insertMany(actionSeed)
                .then((data) => {
                  // console.log(JSON.stringify(data));
                  console.log(data.length + " records inserted");
                  db.Action.updateMany(
                    {},
                    {
                      $set: {
                        lastUpdatedBy: userId,
                        child: childId,
                      },
                    }
                  )
                    .then((data) => {
                      console.log(JSON.stringify(data));
                    })
                    .catch((err) => {
                      console.error(err);
                      process.exit(1);
                    });
                })
                .catch((err) => {
                  console.error(err);
                  process.exit(1);
                });
            });
          })
          .catch((err) => {
            console.error(err);
            process.exit(1);
          });
        // process.exit(0);
      })
      .catch((err) => {
        console.error(err);
        process.exit(1);
      });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
