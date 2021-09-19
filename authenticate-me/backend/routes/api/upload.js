const express = require('express');
const asyncHandler = require('express-async-handler');
const {User, Image, Comment} =  require("../../db/models")
const router = express.Router();

router.get('/:id', asyncHandler(async(req, res) => {
    const {id} = req.params
    const image = await Image.findByPk(id)

    res.json({image});
}));

router.get('/', asyncHandler(async (req, res) => {
    const images = await Image.findAll({
        include: [User]
    });
    return res.json(images)
}));

router.post('/', asyncHandler(async (req, res) => {
    const {userId, albumId, imageUrl, content} = req.body;
    const uploadImage = await Image.create({
        userId,
        albumId,
        imageUrl,
        content
    });
    return res.json(uploadImage);
}));

router.patch('/', asyncHandler(async (req, res) => {
    const { content, id } = req.body;
    const image = await Image.findByPk(id)
    const newImage = await image.update( {content} )

    return res.json(newImage);
}));

router.delete('/', asyncHandler(async (req, res) => {
    const {id} = req.body
    await Comment.destroy({
        where: {imageId: id}
    })
    const deleteImage = await Image.destroy({
        where: {id}
    })
    res.json(deleteImage)
}))

module.exports = router;
