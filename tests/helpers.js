const supertest= require('supertest')
const {app} = require('../app')
const api= supertest(app)

const query= '/api/stores?q={"page": 2, "limit": 5}'
const user= {name:'test@koibanx.com', password: 'admin'}

module.exports= {api,query,user}