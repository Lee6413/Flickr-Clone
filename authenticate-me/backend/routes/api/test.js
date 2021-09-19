// const router = require('express').Router();
const { restoreUser } = require('../../utils/auth.js');
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js');
// const sessionRouter = require('./session.js');
// const usersRouter = require('./users.js');
const photosRouter = require('./photo.js');
const singlePhotoRouter = require('./singlePhoto');
const uploadRouter = require('./upload')
const commentRouter = require('./comment');


router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/photos', photosRouter);

router.use('/singlephoto', singlePhotoRouter)

router.use('/upload', uploadRouter)

router.use('/comments', commentRouter)

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });


  // GET /api/set-token-cookie
router.get('/set-token-cookie', asyncHandler(async (req, res) => {
  const user = await User.findOne({
      where: {
        username: 'Demo-lition'
      },
    })
  setTokenCookie(res, user);
  return res.json({ user });
}));

// GET /api/restore-user
router.get(
  '/restore-user',
  restoreUser,
  (req, res) => {
    return res.json(req.user);
  }
);

// GET /api/require-auth
router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);

module.exports = router;
