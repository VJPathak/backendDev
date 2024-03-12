const controller = require('../controllers/controllerAuth');

let postSignup = controller.postSignup;
let getLogin = controller.getLogin;

const express = require("express");
let router = express.Router();

router
  .route("/signup")
  .get(postSignup);

router
  .route("/login")
  .get(getLogin);

  module.exports = router;