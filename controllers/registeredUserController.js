const RegisteredUser = require("../models/RegisteredUser.model");

const registeredUserController = {
    // Dang ki truc co do
    registeredUser: async (req, res) => {
        try {
            const newRegisteredUser = new RegisteredUser({
                id_user_create: req.params.iduser,
                name: req.body.name,
                email: req.body.email,
                mssv: req.body.mssv,
                register_date: req.body.register_date,
                week: req.body.week,
                shift: req.body.shift,
                attendance: req.body.attendance,
                organization_in_charge: req.body.organization_in_charge,
            });

            const registeredUser = await newRegisteredUser.save();
            res.status(200).json(registeredUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Lay danh sach dang ki truc co do
    getRegisteredUsers: async (req, res) => {
        try {
            const registeredUser = await RegisteredUser.find();
            res.status(200).json(registeredUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Cap nhat user dang ki truc co do
    updateRegisteredUser: async (req, res) => {
        try {
            console.log(req.params.iduser);
            console.log(req.params.id);
            console.log(req.body);
            const registeredUser = await RegisteredUser.findOneAndUpdate(req.params.id, req.body);
            res.status(200).json(registeredUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Xoa user dang ki truc co do
    deleteRegisteredUser: async (req, res) => {
        try {
            console.log(req.params.id);
            console.log(req.body);
            const registeredUser = await RegisteredUser.findOneAndDelete(req.params.id);
            res.status(200).json(registeredUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },

};

module.exports = registeredUserController;