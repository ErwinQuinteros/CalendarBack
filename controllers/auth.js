const { response } = require("express");
const User = require("../models/user");

const crearUsuario = async (req, res = response) => {
    try {
        const user = new User(req.body);
        await user.save();

        res.status(201).json({
            ok: true,
            msg: "registro",
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
