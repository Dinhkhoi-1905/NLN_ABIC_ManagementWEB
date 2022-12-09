//  const { response } = require("express");
// const Courses = require('../models/Courses');
const Nhanvien = require('../models/Nhanviens');
const { multipleMongooseToObject } = require('../../until/mongoose');
const { json } = require('express');
const moment = require('moment'); // require
class SiteController {

    index(req, res, next) {
        Nhanvien.find({})
            .then(nhanviens => {
                res.render('home', {
                    nhanviens: multipleMongooseToObject(nhanviens),
                    // dates: moment(nhanviens.dateofbirth).format('YYYY-MM-DD')
                });
                // console.log(moment("2017-06-01").format('YYYY-MM-DD'));
            })
            .catch(next);
    }
    search(req, res) {
        res.render('search');
    }
    login(  req, res, next ) {
        res.render('Auth/login');
    }
    AccessDenied( req, res, next ) {
        res.render('ErrorPages/AccessDenied');
    }
    PageNotFound(req, res, next ) {
        res.render('ErrorPages/PageNotFound');
    }
}
module.exports = new SiteController;
