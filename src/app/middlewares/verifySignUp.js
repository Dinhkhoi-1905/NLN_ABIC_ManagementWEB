const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
checkUsername = ( req, res, next ) =>{
    var nameRegex = /^[0-9a-zA-Z]+$/;
    //const valid = ;
    if(req.body.username.toString().match(nameRegex) == null){
        req.body.username.trim();
        req.body.email.trim();
        return res.render('Auth/signup',{ error:{location: "username", message:"Only characters A-Z, a-z and 0-9 are  acceptable!"} , data : req.body});
    }
    next();
};
checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  // const bodyTrim = req.body;
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      // res.status(400).send({ message: "Failed! Username is already in use!" });
      // return;
      return res.render('Auth/signup',{ error:{location: "username", message:"Username is already in use!"} , data : req.body});
    }

    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        // res.status(400).send({ message: "Failed! Email is already in use!" });
        // return;
        return res.render('Auth/signup',{ error:{location: "email", message:"Email address is already in use!"} , data : req.body});
      }

      next();
    });
  });

};
checkDuplicatePassword = (req, res, next) => {
  if (req.body.password !== req.body.password2) {
      // res.status(400).send({ message: "Failed!checkDuplicatePassword" });
      // return;
    return res.render('Auth/signup',{ error:{location: "password2", message:"Password confirm not match!"} , data : req.body});

  }
  next();
}
checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
        return;
      }
    }
  }
  next();
};

checkRequiredTrim = (req, res, next) => {
  const trimmed = {
    username: req.body.username.trim(),
    email: req.body.email.trim(),
    password: req.body.password.trim(),
    password2: req.body.password2.trim(),
  }
  if (req.body.username.trim() ==="")  
    return res.render('Auth/signup',{ error:{location: "username", message:"Required!"} , data : trimmed});
  else if (req.body.email.trim() ==="")
    return res.render('Auth/signup',{ error:{location: "email", message:"Required!"} , data : trimmed});
  else if (req.body.password.trim() ===""){
    req.body.password = "";
    return res.render('Auth/signup',{ error:{location: "password", message:"Required!"} , data : trimmed});
  }
  else if (req.body.password2.trim() ==="")
    return res.render('Auth/signup',{ error:{location: "password2", message:"Required!"} , data : trimmed});
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
  checkDuplicatePassword,
  checkRequiredTrim,
  checkUsername
};

module.exports = verifySignUp;
