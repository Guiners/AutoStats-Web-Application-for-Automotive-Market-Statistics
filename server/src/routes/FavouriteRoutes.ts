import express from 'express';
const FavouriteController = require('../controllers/FavouriteController');
const jwtAuth = require('../middlewear/jwtAuth');

const router = express.Router();


router.route('/add')
    .post(FavouriteController.addToFavourite)
    // .get(jwtAuth.auth, FavouriteController.addToFavourite)



router.route('/remove') 
    .delete(FavouriteController.removeFromFavourite)
     // .delete(jwtAuth.auth, PostsController.getFilteredPosts)




    
module.exports = router;