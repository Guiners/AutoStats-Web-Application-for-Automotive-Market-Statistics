import express from 'express';
const PostsController = require('../controllers/PostsController');
const jwtAuth = require('../middlewear/jwtAuth');

const router = express.Router();

router.route('/')
    .get(PostsController.getAllPosts)
    // .get(jwtAuth.auth, PostsController.getAllPosts)

router.route('/filter')
    .get(PostsController.getFilteredColumnsPosts)
    // .get(jwtAuth.auth, PostsController.getFilteredPosts)

router.route('/where')
    .get(PostsController.getDataWherePosts)
    // .get(jwtAuth.auth, PostsController.getFilteredPosts)



module.exports = router;