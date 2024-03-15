const controller = require('../controllers/controllerAuth');

let postSignup = controller.postSignup;
let getLogin = controller.getLogin;
// let getBannerOffers = controller.getBannerOffers;
// let getCategories = controller.getCategories;
// let getItemList = controller.getItemList;
// let postReview = controller.postReview;
// let getReview = controller.getReview;

const express = require("express");
let router = express.Router();

router
  .route("/signup")
  .get((req, res) => {
    res.send("Pl Select Post Request");
    res.json("Pl Select Post Request");
  })
  .post(postSignup);

router
  .route("/login")
  .get(getLogin);

// router
//   .route("/bannerOffers")
//   .get(getBannerOffers);

// router
//   .route("/userReview")
//   .get(getReview)
//   .post(postReview);

// router
//   .route("/categories")
//   .get(getCategories);

// router
//   .route("/itemList")
//   .get(getItemList);

  module.exports = router;
