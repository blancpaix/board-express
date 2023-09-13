const asyncHandler = require('../AsyncHandler');
const { userPropsChecker } = require('../Constraint');
const { responseHnalder } = require('../ResponseHandler');
const { findUser, createUser } = require('../Service/UserService');

const router = require('express').Router({
  caseSensitive : false,
  strict : false,
});


router.post('/checkemail', asyncHandler(async (req, res) => {
  const { email } = req.body;
  userPropsChecker(req.body);

  const user = await findUser(email);
  if (user == null) {
    res.status(200).send(true);
  } else {
    res.status(200).send(false);
  }
}));


router.post('/signup', asyncHandler(async (req, res, next) => {
  const { displayName, email, password } = req.body;
  userPropsChecker(req.body);
  
  await createUser(email, displayName, password)
    .then(signupData => {
      const data = Object.assign(req.body, { uid : signupData.idx, createdAt : signupData.createdAt});
      const responseData = responseHnalder(data, "20011001");
      console.log('resData ', responseData);
      res.status(parseInt(responseData.code.slice(0, 3))).json(responseData);
    })
    .catch(err => {
      next(err);
      return;
    });
}));

router.post('/signin', asyncHandler(async (req, res) => {
  const { email, password }  = req.body;
  userPropsChecker(req.body);

  const result = verifyUser(email, password);


  res.status(200).send();
}));



module.exports =  router;