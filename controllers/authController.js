const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const { dataValid } = require("../utils/dataValidation");

const register = async (req, res) => {
    
    const valid = {
        username: "required",
        password: "required",
        confirmPassword: "required",
        email: "required,isEmail",
        name: "required",
    };

    const user = await dataValid(valid, req.body);

    try {

        if (user.data.password !== user.data.confirmPassword) {
            user.message.push("Password tidak sama");
        }

        if (user.message.length > 0) {
            return res.status(400).json({
                message: user.message,
            });
        }

        const usernameExist = await User.findAll({
            where: {
                username: user.data.username,
            },
        });

        const emailExist = await User.findAll({
            where: {
                email: user.data.email,
            },
        });

        if (usernameExist.length > 0) {
            return res.status(400).json({
                message: "Username telah digunakan",
            });
        }

        if (emailExist.length > 0) {
            return res.status(400).json({
                message: "Email telah digunakan",
            });
        }

        user.data.password = await bcrypt.hash(user.data.password, 10); 

        const newUser = await User.create(user.data);

        return res.status(201).json({
            message: "Registrasi berhasil",
            data: newUser,
        });
    } catch (error) {
        console.log("Error di register", error);
        return res.status(500).json({
            message: "Internal server error",
        })
    }
};

const login = async (req, res) => {
    
    const valid = {
        username: "required",
        password: "required",
    };

    const user = await dataValid(valid, req.body);

    try {
        if (user.message.length > 0) {
            return res.status(400).json({
                message: user.message,
            });
        }

        const existingUser = await User.findOne({
            where: {
                username: user.data.username,
            },
        });

        if (!existingUser) {
            return res.status(400).json({
                message: "Username atau password salah",
            });
        }

        const isPasswordValid = await bcrypt.compare(user.data.password, existingUser.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Username atau password salah",
            });
        }

        const accessToken = jwt.sign(
            { id: existingUser.id }, 
            process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: "1d" }
        );

        res.cookie('jwt', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'development',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({ 
            message: "Login berhasil",
            user: existingUser,
            accessToken
        });
    } catch (error) {
        console.log("Error di login", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}

const logout = async (req, res) => {
    res.clearCookie('jwt');
    return res.status(200).json({ message: "Logout berhasil" });
};

const protectedRoute = (req, res) => {
    res.status(200).json({ 
        message: "Ini route yang tidak bisa diakses tanpa token", 
    });
};

module.exports = { register, login, logout, protectedRoute };