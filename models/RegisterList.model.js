const mongoose = require('mongoose');

const registerListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
    },
    email: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 50,
    },
    mssv: {
        type: String,
        required: true,
        minlength: 8,
    },
}, {timestamps: true}
);

module.exports = mongoose.model('RegisterList', registerListSchema);