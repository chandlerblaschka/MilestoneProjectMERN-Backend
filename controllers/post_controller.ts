const { append } = require('express/lib/response')
const Post = require("../models/post")
const { post } = require('./comment_controller')
const posts = require('express').Router()

// GET
posts.get('/', async (req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: unknown): void; new(): any } } }) => {
   try {
      const foundPosts = await Post.find().sort({ post_date: -1 })
      res.status(200).json(foundPosts)
   } catch (err) {
      res.status(500).json(err)
   }
})

// // POST
posts.post('/', async (req: { body: any }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: unknown): void; new(): any } } }) => {
   try {
      await Post.create(req.body)
      res.status(200).json({ message: 'POST CREATED' })
   } catch (err) {
      res.status(500).json(err)
   }
})

// SHOW
//sorting via https://stackoverflow.com/questions/16352768/how-to-sort-a-populated-document-in-find-request
posts.get('/:id', async (req: { params: { id: any } }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: unknown): void; new(): any } } }) => {
   try {
      const foundPost = await Post.findById(req.params.id)
         .populate({ path: "comments", options: { sort: { comment_date: -1 } } })
      res.status(200).json(foundPost)
   } catch (err) {
      res.status(500).json(err)
   }
})

// UPDATE
posts.put('/:id', async (req: { params: { id: any }; body: any }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: unknown): void; new(): any } } }) => {
   try {
      await Post.findByIdAndUpdate(req.params.id, req.body)
      res.status(200).json({ message: 'UPDATED' })
   } catch (err) {
      res.status(500).json(err)
   }
})

// // DELETE
posts.delete('/:id', async (req: { params: { id: any } }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: unknown): void; new(): any } } }) => {
   try {
      await Post.findByIdAndDelete(req.params.id)
      res.status(200).json({ message: 'DELETED' })
   } catch (err) {
      res.status(500).json(err)
   }
})

module.exports = posts