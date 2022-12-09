//  const { response } = require("express");
// const Courses = require('../models/Courses');
//const NhanVien = require('../models/Nhanviens');
const { mongooseToObject } = require('../../until/mongoose');
const { multipleMongooseToObject } = require('../../until/mongoose')
const moment = require('moment'); // require
const Nhanvien = require('../models/Nhanviens');
const { body, validationResult } = require('express-validator');
const { json } = require('express');
const url = require('url');
const Nhanviens = require('../models/Nhanviens');

const { formattedDate } = require('../../until/mongoose');
const getPagination = (page, size) => {
    const limit = size ? +size : 5;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};
class NhanVienController {
    list(req, res, next) {
        //         Nhanvien.find({}, function (err, nhanviens) {
        //     if (!err) {
        //         res.json(nhanviens);
        //     }
        //     else {
        //         res.status(500).json({ message: "Error" });
        //     }
        // });
        Nhanvien.find({})
            .then(nhanviens => {
                return res.render('nhanviens/list', {
                    nhanviens: multipleMongooseToObject(nhanviens),
                });
            })
            .catch(next);
    }
    listt(req, res, next) {
        req.query.page = req.query.page - 1;
        const { page, size, ho_ten } = req.query;

        var condition = ho_ten
            ? { ho_ten: { $regex: new RegExp(ho_ten), $options: "i" } }
            : {};

        const { limit, offset } = getPagination(page, size);

        Nhanvien.paginate(condition, { offset, limit })
            .then((data) => {
                res.render('nhanviens/list', {
                    //  courses : data.docs,
                    totalItems: data.totalDocs,
                    nhanviens: multipleMongooseToObject(data.docs),
                    totalPages: data.totalPages,
                    lastPage: data.totalPages,
                    currentPage: data.page,
                    nextPage: data.nextPage,
                    previousPage: data.prevPage,
                    beginPage: 0,
                });
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving tutorials.",
                });
            });
    }
    detail(req, res, next) {
        //         Nhanvien.find({}, function (err, nhanviens) {
        //     if (!err) {
        //         res.json(nhanviens);
        //     }
        //     else {
        //         res.status(500).json({ message: "Error" });
        //     }
        // });


        Nhanvien.findOne({ _id: req.params.id })
            .then(nhanvien =>
                res.render('nhanviens/detail', { nhanvien: mongooseToObject(nhanvien) })
            )
            .catch(next);
    }
    create(req, res, next) {
        return res.render('nhanviens/create');
    }

    store(req, res, next) {
        const formData = req.body;
        const nhanvien = new Nhanvien(formData);
        //tét


        //
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('nhanviens/create', { errors: errors.array(), nhanvien: mongooseToObject(nhanvien) });
        }
        else {
            Nhanvien.findOne({})
                .sort({ _id: 'desc' })
                .then(latestNv => {
                    nhanvien._id = latestNv._id + 1;

                    //
                    // const formData = req.body;
                    // const nhanvien = new Nhanvien(formData);
                    nhanvien.save()
                    //  .then(() => res.redirect('/'))
                    //  .catch(error => {

                    // });
                    res.redirect('/nhanvien/list');
                    // const course = new Course(req.body);
                    // course
                    //     .save()
                    //     .then(() => res.redirect('/'))
                    //     .catch(next);
                });
            //res.json(nhanvien);
        }
    }

    edit(req, res, next) {
        // res.render('nhanviens/edit');
        Nhanvien.findById(req.params.id)
            .then(nhanvien => res.render('nhanviens/edit', { nhanvien: mongooseToObject(nhanvien) }))
            .catch(next);
    }
    update(req, res, next) {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.render('nhanviens/edit/' + req.params.id, { errors: errors.array()});
        //     // res.send(req.params.id);
        //     // return res.redirect(req.get('nhanviens/edit',{ errors: errors.array()}));

        // }
        // else{
            Nhanvien.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/nhanvien/'+req.params.id))
            .catch(next);
        // }
    }

    destroy(req, res, next) {
        Nhanvien.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    search123(req, res, next) {
        // res.send(req.body.param);
        // res.redirect('/nhanvien/listt/'+'?ho_ten='+req.body.param);
        // req.getUrl = req.protocol + "://" + req.get('host') + req.originalUrl;
        var url = req.headers.host + '/' + req.url;
        const baseUrl = `${req.protocol}://${req.headers.host}`;
        // var full_address = req.protocol + "://" + req.headers.host + req.baseUrl;
        var full_address = req.protocol + "://" + req.headers.host;

        // res.redirect(full_address+req.baseUrl+ '/listt/?ho_ten='+req.body.param);
        res.send(url.host);


    }
    search(req, res, next) {
        // res.render('nhanviens/search');
        // $regex: new RegExp(req.body.ho_ten)
        Nhanvien.find({ ho_ten: { $regex: new RegExp(req.query.ho_ten), $options: "i" } })
            .then(nhanviens => {
                return res.render('nhanviens/search', {
                    nhanviens: multipleMongooseToObject(nhanviens),
                    searchdata: req.query.ho_ten,
                });
            })
        // .catch(next);
        // res.send(data);
        //         const filters = req.query;
        // res.send(req.query.user);

        // const {ho_ten } = req.query.ho_ten;

        // var condition = ho_ten
        //     ? { ho_ten: { $regex: new RegExp(ho_ten), $options: "i" } }
        //     : {};
    }

    searchpost(req, res, next) {
        // res.render('nhanviens/search');
        res.redirect('http://localhost:3000/nhanvien/search' + '?ho_ten=' + req.body.ho_ten);
    }
    dangvien(req, res, next) {
        // Nhanvien.find({ dang_vien: true })
        //     .then(nhanviens => {
        //         return res.render('nhanviens/ladangvien', {
        //             nhanviens: multipleMongooseToObject(nhanviens),
        //         }); 
        //     })
        req.query.page = req.query.page - 1;
        const { page, size, dang_vien } = req.query;

        var condition = dang_vien
            ? {  }
            : {dang_vien: true};

        const { limit, offset } = getPagination(page, size);

        Nhanvien.paginate(condition, { offset, limit })
            .then((data) => {
                res.render('nhanviens/ladangvien', {
                    //  courses : data.docs,
                    totalItems: data.totalDocs,
                    nhanviens: multipleMongooseToObject(data.docs),
                    totalPages: data.totalPages,
                    lastPage: data.totalPages,
                    currentPage: data.page,
                    nextPage: data.nextPage,
                    previousPage: data.prevPage,
                    beginPage: 0,
                });
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving tutorials.",
                });
            });
    }
    notdangvien(req, res, next) {

        // Nhanvien.find({ dang_vien: false })
        //     .then(nhanviens => {
        //         return res.render('nhanviens/notdangvien', {
        //             nhanviens: multipleMongooseToObject(nhanviens),
        //         });
        //     })
        req.query.page = req.query.page - 1;
        const { page, size, dang_vien } = req.query;

        var condition = dang_vien
            ? {  }
            : {dang_vien: false};

        const { limit, offset } = getPagination(page, size);

        Nhanvien.paginate(condition, { offset, limit })
            .then((data) => {
                res.render('nhanviens/notdangvien', {
                    //  courses : data.docs,
                    totalItems: data.totalDocs,
                    nhanviens: multipleMongooseToObject(data.docs),
                    totalPages: data.totalPages,
                    lastPage: data.totalPages,
                    currentPage: data.page,
                    nextPage: data.nextPage,
                    previousPage: data.prevPage,
                    beginPage: 0,
                });
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving tutorials.",
                });
            });
    }
    caodang(req, res, next){
        req.query.page = req.query.page - 1;
        const { page, size, dang_vien } = req.query;

        var condition = dang_vien
            ? {  }
            : {trinh_do_chuyen_mon: "Cao đẳng"};

        const { limit, offset } = getPagination(page, size);

        Nhanvien.paginate(condition, { offset, limit })
            .then((data) => {
                res.render('nhanviens/caodang', {
                    //  courses : data.docs,
                    totalItems: data.totalDocs,
                    nhanviens: multipleMongooseToObject(data.docs),
                    totalPages: data.totalPages,
                    lastPage: data.totalPages,
                    currentPage: data.page,
                    nextPage: data.nextPage,
                    previousPage: data.prevPage,
                    beginPage: 0,
                });
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving tutorials.",
                });
            });
    }
    daihoc(req, res, next){
        req.query.page = req.query.page - 1;
        const { page, size, dang_vien } = req.query;

        var condition = dang_vien
            ? {  }
            : {trinh_do_chuyen_mon: "Đại học"};

        const { limit, offset } = getPagination(page, size);

        Nhanvien.paginate(condition, { offset, limit })
            .then((data) => {
                res.render('nhanviens/daihoc', {
                    //  courses : data.docs,
                    totalItems: data.totalDocs,
                    nhanviens: multipleMongooseToObject(data.docs),
                    totalPages: data.totalPages,
                    lastPage: data.totalPages,
                    currentPage: data.page,
                    nextPage: data.nextPage,
                    previousPage: data.prevPage,
                    beginPage: 0,
                });
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving tutorials.",
                });
            });
    }
    birthday(req, res, next) {
        // var month = {$month: Nhanvien.ngay_sinh}
        // var ngay_sinh = Nhanvien.ngay_sinh.getUTCMonth();
        Nhanvien.find({ })
            .then(nhanviens => {
                return res.render('nhanviens/birthday', {
                    nhanviens: multipleMongooseToObject(nhanviens),
                });
            })
    }
}
module.exports = new NhanVienController;
