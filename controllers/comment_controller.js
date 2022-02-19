//Dependencies
const express = require('express')
const { json } = require('express/lib/response')
const { events } = require('../models/comment.js')
const comment = express.Router()
const Comment = require('../models/comment.js')

//Index
comment.get('/', async (req, res) => {
    try {
        const foundComments = await Comment.find()
        res.status(200).json(foundComments)
    } catch (err) {
        res.status(500).json(err)
    }
})

// //Show
// comment.get('/:id', (req, res) => {
//     Comment.findById(req.params.id)
//         .populate({
//             path: 'comments',
//             options: { limit: 5 }
//         })
//         .then(foundComment => {
//             res.render('commentShow', {
//                 comment: foundComment
//             })
//         })
// })

//Create
comment.post('/', async (req, res) => {
    try {
        Comment.create(req.body)
    } catch (err) {
        res.status(500).json(err)
    }
})

//Delete
comment.delete('/:id', async (req, res) => {
    try {
        const deletedComments = await Comment.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: `Successfully deleted ${deletedComments} comment.`
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

//Export
module.exports = comment