var express = require('express');
var router = express.Router();
var highlightController = require('../controllers/highlightController');

router.get('/:highlightId', highlightController.highlightById);
router.get('/', highlightController.highlightsByUserName);

module.exports = router;
