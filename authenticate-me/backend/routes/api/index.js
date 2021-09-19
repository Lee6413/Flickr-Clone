const router = require('express').Router();

const commentRouter = require('./comment');
const imageRouter = require('./image');
const imageViewRouter = require('./imageView');
const sessionRouter = require('./session.js');
const uploadRouter = require('./upload');
const usersRouter = require('./users.js');

router.use('/comment', commentRouter);

router.use('/image', imageRouter);

router.use('/imageView', imageViewRouter);

router.use('/session', sessionRouter);

router.use('/upload', uploadRouter);

router.use('/users', usersRouter);

router.post('/test', function(req, res) {
  res.json({ requestBody: req.body });
});

// // GET /api/set-token-cookie
// router.get('/set-token-cookie', asyncHandler(async (req, res) => {
//   const user = await User.findOne({
//       where: {
//         username: 'Demo-lition'
//       },
//     })
//   setTokenCookie(res, user);
//   return res.json({ user });
// }));

// // GET /api/restore-user
// router.get(
//   '/restore-user',
//   restoreUser,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// // GET /api/require-auth
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

module.exports = router;
