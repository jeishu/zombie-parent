const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/zombieparent"
);

const childSeed = [
  {
    name: "Lil Testy",
    birthDate: new Date(Date.now()),
  }
];

const userSeed = [
  {
    name: "Mama Testy",
    password: "isthisatest",
    joinDate: new Date(Date.now()),
    lastLogin: new Date(Date.now()),
    children: [],
    activeChildren: [],
    careOptions: {
      showBottle: true,
      showNurse: true,
      showNap: true,
      showDiaper: true,
    },
    statsView: {
      lastView: "default",
      lastRange: "week",
    }
  }
]

const actionSeed = [
  {
    name: "diaper",
    beginTime: new Date(Date.now()),
    endTime: new Date(Date.now()),
    lastedUpdatedBy: {},
    child: {},
    diaperContents: {
      pee: true
    },
    endedByUser: true
  },
  { 
    name: "diaper",
    beginTime: new Date(Date.now()),
    endTime: new Date(Date.now()),
    lastedUpdatedBy: {},
    child: {},
    diaperContents: {
      pee: true,
      poo: true
    },
    endedByUser: true
  },
  {
    name: "bottle",
    beginTime: new Date(Date.now()),
    endTime: new Date(Date.now()),
    lastedUpdatedBy: {},
    child: {},
    foodOz: 2,
    endedByUser: true
  },
  {
    name: "nurse",
    beginTime: new Date(Date.now()),
    endTime: new Date(Date.now()),
    lastedUpdatedBy: {},
    child: {},
    whichBreast: {
      left: true
    },
    endedByUser: true
  },
  { 
    name: "sleep",
    beginTime: new Date(Date.now()),
    endTime: new Date(Date.now()),
    lastedUpdatedBy: {},
    child: {},
    endedByUser: true
  }
]

db.Book
  .remove({})
  .then(() => db.Book.collection.insertMany(bookSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
