const { response } = require("express");
const bcrypt = require('bcryptjs')
const User = require("../models/user");

const crearUsuario = async (req, res = response) => {
    
    const { email, password } = req.body;
    
    try {

        let user = await User.findOne({ email })
        if( user ) {
            res.status(201).json({
                ok: false,
                msg: "The user exists with this email",
            });
        }

        user = new User(req.body);
        const salt = bcrypt.genSaltSync(); 
        user.password = bcrypt.hashSync(password, salt);
        await user.save();

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Speak with the admin",
        });
    }
};

const loginUsuario = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: "User not found",
            });
        }

        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Invalid credentials",
            });
        }

        res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Speak with the admin",
        });
    }
};


const revalidarToken = (req, res = response) => {
    res.json({
        ok: true,
        msg: "renew",
    });
};

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
};
