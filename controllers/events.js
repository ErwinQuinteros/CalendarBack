const { response } = require("express");
const Event = require("../models/event");

const getEvents = async (req, res = response) => {
    const events = await Event.find().populate("user", "name email");

    res.json({
        ok: true,
        events,
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
            msg: "Please contact the admin",
        });
    }
};

const updateEvent = async (req, res = response) => {
    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId);

        if (!event) {
            res.status(404).json({
                ok: false,
                msg: "Event not found",
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "Unauthorized to edit this event",
            });
        }

        const updatedEvent = {
            ...req.body,
            user: uid,
        };
        const eventUpdated = await Event.findByIdAndUpdate(eventId, updatedEvent, {
            new: true,
        });

        res.json({
            ok: true,
            event: eventUpdated,
        });
    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: "Please contact the admin",
        });
    }
};

const deleteEvent = async (req, res = response) => {
    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: "Event not found",
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "Unauthorized to delete this event",
            });
        }
        await Event.findByIdAndDelete(eventId);

        res.json({
            ok: true,
            msg: "Event deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: "Please contact the admin",
        });
    }
};

module.exports = {
    updateEvent,
    deleteEvent,
    createEvent,
    getEvents,
};
