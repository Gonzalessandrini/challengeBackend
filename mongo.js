const mongoose = require('mongoose')
mongoose.Promise = Promise

const {MONGODB_URI, MONGODB_URI_TEST, NODE_ENV}= process.env

console.log({NODE_ENV})

const connectionString= NODE_ENV == 'test'

    ? MONGODB_URI_TEST
    : MONGODB_URI

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        console.log('Database conected')
    }).catch(err => {
        console.error(err)
    })


