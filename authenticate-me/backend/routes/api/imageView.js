const express = require('express');
const asyncHandler = require('express-async-handler');
const { User, Image } = require('../../db/models')
const router = express.Router()

router.get('/:id', asyncHandler(async(req, res) => {
    const {id} = req.params
    const image = await Image.findByPk(id)

    res.json(image);
}));

module.exports = router;
