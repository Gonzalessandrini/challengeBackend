const handleErrors = require('./middleware/handleErrors');
const notFound= require('./middleware/notFound')
const Sentry = require('@sentry/node');

const storesRouter= require('./routes/stores')

const express = require('express')
const app = express()

const dotenv = require('dotenv');
dotenv.config();
const {init}=require('./utils/initializer')

require('./mongo')
init()

app.use(express.json())

Sentry.init({ dsn: "https://9658761d8612444cad2083afdcadd33c@o4505330642649088.ingest.sentry.io/4505330644746240" });
app.use(Sentry.Handlers.requestHandler());

app.use('/api', storesRouter);

app.use(notFound)

app.use(Sentry.Handlers.errorHandler());
app.use(handleErrors)

// Start the server
const PORT= process.env.PORT || 3000

const server= app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
});

console.log('cualquier cosa')

module.exports = {app, server}
