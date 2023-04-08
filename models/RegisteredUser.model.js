const mongoose = require('mongoose');

const registeredUserSchema = new mongoose.Schema({
    id_user_create: {
        type: String,
        required: true,
    },
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
    register_date: {
        type: Date,
        required: true,
    },
    week: {
        type: Number,
        required: true,
    },
    shift: {
        type: String,
        required: true,
    },
    attendance: {
        type: Boolean,
        default : false,
    },
    organization_in_charge: {
        type: String,
        default: null
    }
}, {timestamps: true}
);

module.exports = mongoose.model('RegisteredUser', registeredUserSchema);