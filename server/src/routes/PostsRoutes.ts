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

router.route('/filter/where')
    .get(PostsController.getDataWherePosts)
    // .get(jwtAuth.auth, PostsController.getFilteredPosts)

router.route('/filter/distinctModel')
    .get(PostsController.getBrandModelGen)
    // .get(jwtAuth.auth, PostsController.getFilteredPosts)

router.route('/filter/distinctFuelType')
    .get(PostsController.getFuelType)
    // .get(jwtAuth.auth, PostsController.getFilteredPosts)

router.route('/filter/distinctGearBox')
    .get(PostsController.getGearBox)
    // .get(jwtAuth.auth, PostsController.getFilteredPosts)

module.exports = router;