const router = require('express').Router({
  caseSensitive : false,
  strict : false,
});


router.get('/', (req, res) => {
  console.log('Auth Router testing...');
  res.status(200).send();
});

router.post('/signup', (req, res) => {
  console.log('req.body', req.body);

  if (userObj.hasOwnProperty(req.body.username)) {
    throw Error("already exists");
  };
  userObj[req.body.username] = req.body;

  res.status(200).send();
});

router.post('/signin', (req, res) => {
  console.log('req.body', req.body);
  if (!userObj.hasOwnProperty(req.body.username)) {
    throw Error("Not Existing user");
  };

  const userData = userObj[req.body.username];
  if (userData.password != req.body.password) {
    throw Error("Password not matching");
  };

  res.status(200).send();
})

// module.exports = router;

module.exports =  router;