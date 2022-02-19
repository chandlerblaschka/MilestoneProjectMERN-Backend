//Dependencies
const express = require('express')
const comment = express.Router()
const Comment = require('../models/comment.js')

//Index
comment.get('/', (req, res) => {
    Comment.find()
        .populate('comments')
        .then(foundComments => {
            res.send(foundComments)
        })
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

//Delete
comment.delete('/:id', (req, res) => {
    Comment.findByIdAndDelete(req.params.id)
        .then(deletedComment => {
            res.status(303).redirect('/posts')
        })
})