const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const { Image } = require('../../db/models');
const router = express.Router();

router.post (
  '/images/new',
  asyncHandler(async(req,res) => {
    const { imageURL, content } = req.body;
    const newImage = await Image.create({imageURL, content});

    res.json ({
      newImage
    });
  }),
);

module.exports = router;
