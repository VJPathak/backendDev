const controller = require('../controllers/controllerAuth');

let postSignup = controller.postSignup;
let getLogin = controller.getLogin;
let getBannerOffers = controller.getBannerOffers;
let postItemListCat1 = controller.postItemListCat1;
let postItemListCat2 = controller.postItemListCat2;
let getItemListCat1 = controller.getItemListCat1;
let getItemListCat2 = controller.getItemListCat2;
let postCat1Review = controller.postCat1Review;
let postCat2Review = controller.postCat2Review;

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

router
  .route("/bannerOffers")
  .get(getBannerOffers);

router
  .route("/userReviewTOmenswear")
  .post(postCat1Review)
  // .post(postReview);

router
  .route("/userReviewTOwomenswear")
  .post(postCat2Review)
  // .post(postReview);

router
  .route("/menswear")
  .get(getItemListCat1)
  .post(postItemListCat1);

  router
  .route("/womenswear")
  .get(getItemListCat2)
  .post(postItemListCat2);

  module.exports = router;
