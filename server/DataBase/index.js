const { ExplainVerbosity } = require("mongodb");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://ArjunSingh:EhCymlXmIoRzqhOk@databaseccluster.q75hq.mongodb.net/aliBaba"
  )
  .then(() => {
    console.log("DataBase now connected");
  })
  .catch((e) => {
    console.log(e);
  });
