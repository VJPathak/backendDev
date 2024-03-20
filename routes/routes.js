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
let postCoupon = controller.postCoupon;
let getCoupon = controller.getCoupon;
let postAddToCart = controller.postAddToCart;
let getCartItems = controller.getCartItems;
let postAddress = controller.postAddress;
let getAddress = controller.getAddress;
let postSampleAPI = controller.postSampleAPI;
let getCat1Reviews = controller.getCat1Reviews;
let getCat2Reviews = controller.getCat2Reviews;

const express = require("express");
let router = express.Router();

router
  .route("/sampleapi")
  .get(postSampleAPI);

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
  .route("/userReview/menswear")
  .post(postCat1Review)
  // .post(postReview);

router
  .route("/userReview/womenswear")
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

router
  .route("/coupons")
  .get(getCoupon)
  .post(postCoupon);

router
  .route("/addtocart")
  .post(postAddToCart)


router
  .route("/viewcart")
  .get(getCartItems)

router
  .route("/addaddress")
  .post(postAddress)

router
  .route("/getaddress")
  .get(getAddress)

router
  .route("/cat1reviews")
  .get(getCat1Reviews);

router
  .route("/cat2reviews")
  .get(getCat2Reviews);

  module.exports = router;
