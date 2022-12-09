//const moment = require('moment'); // require
module.exports = {
    multipleMongooseToObject: function (mongooses) { 
        return mongooses.map(
            mongoose => mongoose.toObject());
        },
    mongooseToObject:   function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    },
    formattedDate: (date) => {
        if (date != undefined) return date.toLocaleDateString();
        else return date;
      },

    // formattedDate: function (date) {
    //     return moment(date).format('YYYY-MM-DD');
    // }
};