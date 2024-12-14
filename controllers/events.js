const { response } = require("express");
const Event = require("../models/event");

const getEvents = (req, res = response) => {
    res.json({
        ok: true,
        msg: "getEvents",
    });
};

const createEvent = async (req, res = response) => {

    const event = new Event(req.body);
    
    try {

        event.user = req.uid;
        const eventoSaved = await event.save();

        res.json({
            ok: true,
            event: eventoSaved,
        });
    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: "Speak the admin",
        });
    }
};

const updateEvent = (req, res = response) => {
    res.json({
        ok: true,
        msg: "updateEvent",
    });
};

const deleteEvent = (req, res = response) => {
    res.json({
        ok: true,
        msg: "deleteEvent",
    });
};

module.exports = {
    updateEvent,
    deleteEvent,
    createEvent,
    getEvents,
};
