var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/api/books', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/api/books/:id', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/api/books/post', function(req, res, next) {
  res.send('respond with a resource');
});
module.exports = router;
