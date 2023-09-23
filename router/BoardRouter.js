const { verifyJwt } = require('../middlewares/AuthJwt');

const router = require('express').Router({
  caseSensitive : true,
  strict : false,
});


// 게시글 목록 반환 - param 활용 페이지네이션
router.get('/', (req, res) => {
  console.log(req.params);
  console.log('Board Router testing...');
  res.status(200).send();
});


// 게시글 등록
router.post("/", (req, res) => {
  res.send();
});

// 게시글 조회
router.get("/:id", (req, res) => {
  res.send();
});

// 게시글 삭제
router.post("/:id", (req, res) => {
  res.send();
});

// 내가 작성한 게시글 조회
router.get('/my', verifyJwt, (req, res, next) => {
  console.log(req.headers['user-agent'], req.headers.authorization, req.headers.refresh);
  res.status(200).send("HIHIHIHIHI!");
});




module.exports = router;