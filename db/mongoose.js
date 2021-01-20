const mongoose = require('mongoose');

mongoose.connect(process.env.DBURL, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName:process.env.dbName
}, () => {  console.log('connected to database')})