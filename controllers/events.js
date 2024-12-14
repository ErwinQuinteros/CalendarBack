
const { response } = require('express');
const user = require("../models/event");

const getEvents = ( req, res = response ) => {
    
    res.json({
        ok: true,
        msg: 'getEvents'
    })
}

const createEvent = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'createEvents'
    });
};

const updateEvent = ( req, res = response ) => {
    res.json({
        ok: true,
        msg: 'updateEvent'
    })
}

const deleteEvent = ( req, res = response ) => {
    res.json({
        ok: true,
        msg: 'deleteEvent'
    })
}


module.exports = {
    updateEvent,
    deleteEvent,
    createEvent,
    getEvents,
}