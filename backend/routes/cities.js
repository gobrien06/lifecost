var express = require('express');
var router = express.Router();
var cities = require('../models/cities')


router.get('/:city/:job/all', function(req, res) {
    console.log('hehe');
    cities.getAll(res, req.params['city'], req.params['job']);
});

router.get('/:city/all', function(req, res) {
    console.log('hee');
    cities.getCity(res, req.params['city']);
    console.log('haw');
});

module.exports = router;

