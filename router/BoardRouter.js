const { verifyJwt } = require('../middlewares/AuthJwt');

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

router.get('/my', verifyJwt, (req, res, next) => {
  console.log(req.headers['user-agent'], req.headers.authorization, req.headers.refresh);
  res.status(200).send("HIHIHIHIHI!");
});




module.exports = router;