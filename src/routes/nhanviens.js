const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const nhanvienController = require('../app/controllers/NhanVienController');
const { authJwt } = require("../app/middlewares");


router.get('/search', nhanvienController.search);

router.post('/searchpost', nhanvienController.searchpost);
router.get('/create',[authJwt.verifyToken,authJwt.isAdmin], nhanvienController.create);
router.get('/list',[authJwt.verifyToken], nhanvienController.listt);

router.get('/listt',[authJwt.verifyToken], nhanvienController.listt);

router.get('/birthday', nhanvienController.birthday);
router.get('/dangvien', nhanvienController.dangvien);
router.get('/notdangvien', nhanvienController.notdangvien);
router.get('/caodang', nhanvienController.caodang);
router.get('/daihoc', nhanvienController.daihoc);
router.get('/:id',[authJwt.verifyToken], nhanvienController.detail);


router.get('/edit/:id',[authJwt.verifyToken, authJwt.isAdmin, authJwt.isModerator], nhanvienController.edit);
router.put('/update/:id',
body('ho_ten').trim().notEmpty()
.withMessage('Tên không được để trống!')
,body('gioi_tinh').trim().notEmpty()
.withMessage('Vui lòng chọn giới tính!')
,body('ngay_sinh').trim().notEmpty()
.withMessage('Vui lòng chọn ngày sinh!')
,body('dia_chi.so_nha').trim().notEmpty()
.withMessage('Vui lòng nhập số nhà!')
,body('dia_chi.khom_ap').trim().notEmpty()
.withMessage('Vui lòng nhập khóm, ấp!')
,body('dia_chi.phuong_xa').trim().notEmpty()
.withMessage('Vui lòng nhập phường, xã!')
,body('dia_chi.quan_huyen').trim().notEmpty()
.withMessage('Vui lòng nhập quận, huyện!')
,body('dia_chi.tinh_tp').trim().notEmpty()
.withMessage('Vui lòng nhập tỉnh, thành phố!')
,body('ngay_vao_ABIC').trim().notEmpty()
.withMessage('Vui lòng nhập ngày vào ABIC!')
,body('trinh_do_chuyen_mon').trim().notEmpty()
.withMessage('Vui lòng nhập trình độ chuyên môn')
,body('lop_nghiep_vu.noi_dung').trim().notEmpty()
.withMessage('Vui lòng nội dung lớp nghiệp vụ')
,body('lop_nghiep_vu.ngay_cap_chung_chi').trim().notEmpty()
.withMessage('Vui lòng nhập ngày cấp chứng chỉ!')
,body('lop_boi_duong.noi_dung').trim().notEmpty()
.withMessage('Vui lòng nhập nội dung lớp bồi dưỡng!')
,body('lop_boi_duong.ngay_dao_tao').trim().notEmpty()
.withMessage('Vui lòng nhập ngày đào tạo!')
,body('chuc_danh').trim().notEmpty()
.withMessage('Vui lòng nhập chức danh!')
,body('bo_phan_cong_tac.phong').trim().notEmpty()
.withMessage('Vui lòng nhập phòng công tác!')
,body('bo_phan_cong_tac.chi_nhanh').trim().notEmpty()
.withMessage('Vui lòng nhập chi nhánh công tác!'),
 nhanvienController.update);

router.delete('/:id',[authJwt.verifyToken,authJwt.isAdmin], nhanvienController.destroy);
module.exports = router;
router.post('/store',
    body('ho_ten').trim().notEmpty()
    .withMessage('Tên không được để trống!')
    ,body('gioi_tinh').trim().notEmpty()
    .withMessage('Vui lòng chọn giới tính!')
    ,body('ngay_sinh').trim().notEmpty()
    .withMessage('Vui lòng chọn ngày sinh!')
    ,body('dia_chi.so_nha').trim().notEmpty()
    .withMessage('Vui lòng nhập số nhà!')
    ,body('dia_chi.khom_ap').trim().notEmpty()
    .withMessage('Vui lòng nhập khóm, ấp!')
    ,body('dia_chi.phuong_xa').trim().notEmpty()
    .withMessage('Vui lòng nhập phường, xã!')
    ,body('dia_chi.quan_huyen').trim().notEmpty()
    .withMessage('Vui lòng nhập quận, huyện!')
    ,body('dia_chi.tinh_tp').trim().notEmpty()
    .withMessage('Vui lòng nhập tỉnh, thành phố!')
    ,body('ngay_vao_ABIC').trim().notEmpty()
    .withMessage('Vui lòng nhập ngày vào ABIC!')
    ,body('trinh_do_chuyen_mon').trim().notEmpty()
    .withMessage('Vui lòng nhập trình độ chuyên môn')
    ,body('lop_nghiep_vu.noi_dung').trim().notEmpty()
    .withMessage('Vui lòng nội dung lớp nghiệp vụ')
    ,body('lop_nghiep_vu.ngay_cap_chung_chi').trim().notEmpty()
    .withMessage('Vui lòng nhập ngày cấp chứng chỉ!')
    ,body('lop_boi_duong.noi_dung').trim().notEmpty()
    .withMessage('Vui lòng nhập nội dung lớp bồi dưỡng!')
    ,body('lop_boi_duong.ngay_dao_tao').trim().notEmpty()
    .withMessage('Vui lòng nhập ngày đào tạo!')
    ,body('chuc_danh').trim().notEmpty()
    .withMessage('Vui lòng nhập chức danh!')
    ,body('bo_phan_cong_tac.phong').trim().notEmpty()
    .withMessage('Vui lòng nhập phòng công tác!')
    ,body('bo_phan_cong_tac.chi_nhanh').trim().notEmpty()
    .withMessage('Vui lòng nhập chi nhánh công tác!')
 ,nhanvienController.store);