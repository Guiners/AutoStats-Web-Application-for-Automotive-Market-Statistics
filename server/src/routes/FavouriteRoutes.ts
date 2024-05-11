import express from "express";
const FavouriteController = require("../controllers/FavouriteController");
const jwtAuth = require("../middlewear/jwtAuth");

const router = express.Router();

router.route("/add").post(FavouriteController.addToFavourite);
// .get(jwtAuth.auth, FavouriteController.addToFavourite)

router.route("/remove").post(FavouriteController.removeFromFavourite);
// .delete(jwtAuth.auth, PostsController.getFilteredPosts)

router
  .route("/getUserFavId")
  .get(FavouriteController.getUsersFavouriteQueriesIds);
// .delete(jwtAuth.auth, PostsController.getFilteredPosts)

router
  .route("/getQueryFromId")
  .get(FavouriteController.getQueryFromFavouriteById);
// .delete(jwtAuth.auth, PostsController.getFilteredPosts)

router
  .route("/getUserFavParameters")
  .post(FavouriteController.getUsersFavouriteQueriesParameters);
// .delete(jwtAuth.auth, PostsController.getFilteredPosts)

module.exports = router;
