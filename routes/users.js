var express = require('express');
var router = express.Router();
var userHelper = require("../helpers/userHelper")
var functionHelper = require("../helpers/functionHelper")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user/user', { title: 'User' });
});

module.exports = router;
