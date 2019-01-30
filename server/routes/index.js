var express = require('express');
var router = express.Router();
var cron = require('node-cron');
var newyear = false
var christmas = false

cron.schedule('0 0 25 12 *', () => {
  christmas = true
});

cron.schedule('0 0 26 12 *', () => {
  christmas = false
});

cron.schedule('0 0 1 1 *', () => {
  newyear = true
});

cron.schedule('0 0 2 1 *', () => {
  newyear = false
});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/bigday', function(req, res) {
  res.status(200).json({
    christmas: christmas,
    newyear: newyear,
  })
})

module.exports = router;
