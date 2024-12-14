/* 
    Events routes
*/

const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt')
const router = Router();
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validations');
const { createEvent, updateEvent, deleteEvent, getEvents} = require('../controllers/events');
const { isDate } = require('../helpers/isDate');

router.use( validateJWT );
// get events
router.get( '/', getEvents );

// create new event
router.post('/',
    [
        check('title','Title is required').not().isEmpty(),
        check('start','Date start is required').custom( isDate ),
        check('end','Date end is required').custom( isDate ),
        validateFields
    ],
    createEvent );

// update event
router.put('/:id', updateEvent );

// delete event 
router.delete('/:id', deleteEvent );


module.exports = router;