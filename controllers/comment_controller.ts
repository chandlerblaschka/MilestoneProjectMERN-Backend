export { }

//Dependencies
const express = require('express')
const { json } = require('express/lib/response')
const comment = express.Router()
const Comment = require('../models/comment.ts')
// import Comment from '../models/comment'

//Index
comment.get('/', async (req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: unknown): void; new(): any } } }) => {
    try {
        const foundComments = await Comment.find()
        res.status(200).json(foundComments)
    } catch (err) {
        res.status(500).json(err)
    }
})

//Create
comment.post('/', async (req: { body: any }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: unknown): void; new(): any } } }) => {
    try {
        await Comment.create(req.body)
        res.status(200).json({ message: "Comment added" })
    } catch (err) {
        res.status(500).json(err)
    }
})

//Delete
comment.delete('/:id', async (req: { params: { id: any } }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: unknown): void; new(): any } } }) => {
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
module.exports = { comment }