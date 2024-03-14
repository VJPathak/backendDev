const controller = require('../controllers/controllerAuth');

let postSignup = controller.postSignup;
let getLogin = controller.getLogin;
let getBannerOffers = controller.getBannerOffers;
let getCategories = controller.getCategories;
let getItemList = controller.getItemList;

const express = require("express");
let router = express.Router();

router
  .route("/signup")
  .get((req, res) => {
    res.send("Hello");
  })
  .post(postSignup);

router
  .route("/login")
  .get(getLogin);

router
  .route("/bannerOffers")
  .get(getBannerOffers);

router
  .route("/categories")
  .get(getCategories);

router
  .route("/itemList")
  .get(getItemList);

  module.exports = router;