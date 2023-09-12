const router = require('express').Router({
  caseSensitive : true,
  strict : false,
});

const logger = (req, res, next) => {
  console.log('Time : ', Date.now());
  next();
};

router.use(logger);

router.get('/', (req, res) => {
  console.log('Board Router testing...');
  res.status(200).send();
});

module.exports = router;