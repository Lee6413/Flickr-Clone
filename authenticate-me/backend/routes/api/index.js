const router = require('express').Router();

const commentRouter = require('./comments.js');
const photosRouter = require('./photos.js');
const sessionRouter = require('./session.js');
const albumsRouter = require('./albums.js')
const usersRouter = require('./users.js');

router.use('/comments', commentsRouter);

router.use('/photos', photosRouter);

router.use('/session', sessionRouter);

router.use('/albums', albumsRouter);

router.use('/users', usersRouter);

router.post('/test', function(req, res) {
  res.json({ requestBody: req.body });
});

module.exports = router;
