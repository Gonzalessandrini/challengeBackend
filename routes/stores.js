const storesRouter = require('express').Router()
const authentication= require('../middleware/basicAuth')
const {getAll,createStore}= require('../services/stores')

storesRouter.get('/stores',authentication, getAll)

storesRouter.post('/stores',authentication, createStore)

module.exports = storesRouter
