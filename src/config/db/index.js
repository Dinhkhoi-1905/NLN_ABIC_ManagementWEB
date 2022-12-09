const mongoose = require('mongoose');

async function connect(){
    try {
        await mongoose.connect('mongodb://localhost:27017/QLNV_ABIC',{
            // useNewUrlParser: true, only set to true in mongoose 6
            // useUnifiedTopology: true,
        });
        console.log('Connecting to MongoDB successfully !!!!');
    } catch (error) {
        console.log('Error connecting to Mongo Database !!!!');
    }
}

module.exports = {connect};