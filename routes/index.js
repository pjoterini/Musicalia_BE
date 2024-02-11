const express = require('express')
const router = express.Router()
const { getAllData } = require('../controllers/index/getAllData')
const {
  getQueriedArticles
} = require('../controllers/index/getQueriedArticles')

router.get('/', getAllData)
router.post('/', getQueriedArticles)

module.exports = router
