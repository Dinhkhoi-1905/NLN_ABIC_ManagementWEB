const { Router } = require('express');
const express = require('express');
const router = express.Router();
const { authJwt } = require("../app/middlewares");

const siteController = require('../app/controllers/SiteController');

// const nhanvienController = require('../app/controllers/NhanVienController');
// router.get('/search', siteController.search);
router.get('/',[authJwt.verifyToken],siteController.index);
//router.get('/login', siteController.login);
router.get('/403', siteController.AccessDenied);
router.get('/404', siteController.PageNotFound);
module.exports = router;