const { response } = require("express");
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

const loginUsuario = (req, res = response) => {
    const { email, password } = req.body;
    
    res.status(201).json({
        ok: true,
        msg: "login",
        email,
        password,
    });
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
