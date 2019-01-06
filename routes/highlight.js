var express = require('express');
var router = express.Router();
var highlightController = require('../controllers/highlightController');

router.get('/:username', highlightController.highlightsByName);

module.exports = router;