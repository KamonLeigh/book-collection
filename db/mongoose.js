const mongoose = require('mongoose');
const { yellow } = require('chalk');

mongoose.connect(process.env.DBURL, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: process.env.dbName,
}, () => { console.log(yellow('connected to database')); });
