const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const user = require('./api-user');
/* GET users listing. */
router.get('/api/getuser', user);

module.exports = router;