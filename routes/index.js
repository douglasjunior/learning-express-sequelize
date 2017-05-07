var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  models.User.findAll()
  .then(function(result) {
    res.json({status: "ok", result: result});
  })
  .catch(function(ex){
    console.error(ex);
    res.status(500).send();
  })
});

module.exports = router;
