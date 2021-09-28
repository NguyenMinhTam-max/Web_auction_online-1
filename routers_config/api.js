const express = require('express')

const API = express.Router()

const favoriteProductController = require('../controllers/favoriteProduct.controller')
const bidProductController = require('../controllers/bidProduct.controller')
const sellerController = require('../controllers/seller.controller')
const authController = require('../controllers/authentication.controller')


API.use('/auth', authController)
API.use('/favorite-product', favoriteProductController)
API.use('/bid', bidProductController)
API.use('/seller', sellerController)

module.exports = API