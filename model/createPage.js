const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newPage = new Schema ({
    nameOfPage: {
        type: String,
        require: true
    }
    // will add more to this as I go on
})

module.exports = mongoose.model('newPage', newPage);