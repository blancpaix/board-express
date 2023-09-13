const router = require('express').Router({
  caseSensitive : true,
  strict : false,
});

const logger = (req, res, next) => {
  console.log('Time : ', Date.now());
  next();
};

router.use(logger);

// 목록을 뿌려주는게 좋을듯?
router.get('/', (req, res) => {
  console.log(req.params);
  console.log('Board Router testing...');
  res.status(200).send();
});




module.exports = router;