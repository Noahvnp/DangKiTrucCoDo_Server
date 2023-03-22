const User = require('../models/User.model');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

let refreshTokens = []; //create array of refresh tokens for checking token

const authController =  {
    // REGISTER
    registerUser: async(req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
            // create a new user
            const newUser = new User({
                username: req.body.username,
                password: hashed,
                email: req.body.email,
            });
            
            // Save new user to database
            const user = await newUser.save();
            res.status(200).json(user);
        } catch(err) {
            res.status(500).json(err);
        }
    },

    //LOGIN
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({username: req.body.username})
            if(!user) {
                return res.status(404).json("wrong username!");
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if(!validPassword) {
                return res.status(404).json("wrong password!");
            }
            if(user && validPassword) {
                const accessToken = authController.generateAccessToken(user);
                const refreshToken = authController.generateRefreshToken(user);
                refreshTokens.push(refreshToken);
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                })

                const {password, ...others} = user._doc;
                res.status(200).json({...others, accessToken});
            }

        } catch(err) {
            res.status(500).json(err);
        }
    },

    // USER LOG OUT
    logoutUser: async (req, res) => {
        res.clearCookie("refreshToken");
        refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken);
        res.status(200).json("Logged out successfully");
    },

    // GENERATE ACCESS TOKEN
    generateAccessToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin,
            },
            process.env.JWT_ACCESS_KEY,
            {expiresIn: "20s"}
        );
    },

    // GENERATE REFRESH TOKEN
    generateRefreshToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin,
            },
            process.env.JWT_REFRESH_KEY,
            {expiresIn: "365d"}
        );
    },


    requestRefreshToken: async (req, res) => {
        // take the refresh token from user
        const refreshToken = req.cookies.refreshToken;

        if(!refreshToken) return res.status(401).json("You are not authenticated");

        if(!refreshTokens.includes(refreshToken)) return res.status(403).json("Refresh token is not available");

        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            if(err) {
                console.log(err);
            }
            refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
            // Create a new access token, refresh token
            const newAccessToken = authController.generateAccessToken(user);
            const newRefreshToken = authController.generateRefreshToken(user);
            refreshTokens.push(newRefreshToken);
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            });
            res.status(200).json({accessToken: newAccessToken});
        })
    }

};

module.exports = authController;    