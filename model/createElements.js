const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const createElement = new Schema ({
    nameOfElement: {
        type: String,
        required: true
    },
    typeOfData: {
        type: String,
        required: true
    },
    numberOfCharacters: {
        type: Number,
        required: true
    }

});

module.exports = mongoose.model('createElement', createElement)