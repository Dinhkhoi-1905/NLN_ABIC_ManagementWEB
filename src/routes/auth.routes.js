 const { verifySignUp } = require("../app/middlewares");
// const controller = require("../controllers/auth.controller");

const { body, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/auth.controller');
// module.exports = function(app) {
//   app.use(function(req, res, next) {
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, Content-Type, Accept"
//     );
//     next();
//   });

  router.get("/signin", authController.getsignin);
  router.get("/signup", authController.getsignup);
  router.post(
    "/signup",
    [
      
      checkUsername,
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
      verifySignUp.checkDuplicatePassword,
      checkRequiredTrim,
    ],
    // body('username').trim().notEmpty()
    // .withMessage('Tên không được để trống!')
    // ,body('email').trim().notEmpty()
    // .withMessage('Email không được để trống!')
    // ,
    authController.signup
  );
  
  router.post("/signin", authController.signin);

  router.post("/signout", authController.signout);
// };
module.exports = router;
