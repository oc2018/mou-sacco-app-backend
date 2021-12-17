import express from 'express';
import { getPostsBySearch, getPosts, createPost, updatePost, getPost, deletePost } from '../controllers/posts.js';


import auth from '../middleware/auth.js';

const router = express.Router();


router.get('/search', auth, getPostsBySearch);
router.get('/', auth, getPosts);
router.get('/:id', auth, getPost)
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id',auth, deletePost);

export default router;