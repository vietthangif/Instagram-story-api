var express = require('express');
var router = express.Router();
var storyController = require('../controllers/storyController');

router.get('/:username', storyController.storiesByName);

module.exports = router;