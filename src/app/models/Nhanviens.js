const mongoose = require('mongoose');
const mongoosePaginate  = require('mongoose-paginate-v2');
const slug = require('mongoose-slug-generator')
const moment = require('moment'); // require
//const mongooseDateFormat = require('mongoose-date-format');


//moment().format(); 
mongoose.plugin(slug);

mongoose.plugin(mongoosePaginate);

const Schema = mongoose.Schema;
const Nhanvien = new Schema({
    _id: { type: Number, required: true},
    ho_ten: { type: String, required: true},
    gioi_tinh: { type: String, required: true},
    ngay_sinh: { type: Date, required: true, default: Date.now()},
    dia_chi: {
        so_nha: String,
        khom_ap: String,
        phuong_xa: String,
        quan_huyen: String,
        tinh_tp: String
    },
    ngay_vao_ABIC:{ type: Date, required: true, default: Date.now()},
    trinh_do_chuyen_mon: { type: String, required: true},
    lop_nghiep_vu: {
        noi_dung: {type: String, required: true, default: ""},
        ngay_cap_chung_chi: {type: Date, required: true, default: Date.now()},
    },
    lop_boi_duong: {
        noi_dung: {type: String, required: false, default: ""},
        ngay_dao_tao: {type: Date, required: false, default: Date.now()},
    },
    dang_vien: {type: Boolean, required: true},
    chuc_danh: { type: String, required: true},
    bo_phan_cong_tac:{
        phong: {type: String, required: true},
        chi_nhanh: {type: String, required: true},
    },
    ngay_nghi_huu: { type: Date, required: false, default: Date.now()},
    ghi_chu: { type: String, required: false},

},{_id: false}); 
// var dateFormatted = moment(Nhanvien.ngay_sinh).format('YYYY-MM-DD');
// console.log(dateFormatted);

//Nhanvien.plugin(require('mongoose-plugin-date-format')('YYYY-MM-DDTHH:mm:ss[Z]'));
// console.log(moment('24/12/2019 09:15:00').format('dddd'));
module.exports = mongoose.model('Nhanvien', Nhanvien);