var express = require('express');
var router = express.Router();
var storyController = require('../controllers/storyController');

router.get('/', storyController.storiesByName);

module.exports = router;
