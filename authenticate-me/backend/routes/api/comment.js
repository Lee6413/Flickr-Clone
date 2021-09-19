const express = require('express')
const asyncHandler = require('express-async-handler')
const router = express.Router()

const { Image, User, Comment } = require('../../db/models')

//Create Comment
router.post('/', asyncHandler(async (req, res) => {
    const {userId, imageId, comment} = req.body;

    let cmnt = await Comment.create({userId, imageId, comment})
    res.json(cmnt)
}))

//Read Comment
router.get('/:id', asyncHandler(async (req, res) => {
    const {id} = req.params
    const cmnt = await Comment.findAll({
        where: {imageId: id}
    })
    res.json(cmnt)
}))

router.get('/image/:id', asyncHandler(async(req, res) => {
    const allComments = await Comment.findAll({where: {imageId: req.params.id}})
    res.json(allComments)
}))

router.put('/:id', asyncHandler(async(req, res) => {
    const {comment} = req.body;
    const cmntId = req.params.id
    // console.log(comment)
    const cmnt = await Comment.findByPk(cmntId)
    const newCmnt = await cmnt.update({comment})

    return res.json(newCmnt)
}))

//Delete Comment
router.delete('/:id', asyncHandler(async(req, res) => {
    const {id} = req.params
    const data = await Comment.destroy({
        where: {id}
    })
    res.json(data)
}))
module.exports = router
