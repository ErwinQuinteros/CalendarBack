/*
    Routes of Users / Auth
    host + /api/auth
*/

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator')

const { validateFields } = require('../middlewares/validations');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/validate-jwt')


router.post(
    '/new',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email debe ser válido').isEmail(),
        check('password', 'El password debe tener al menos 6 caracteres').isLength({ min: 6 }),
        validateFields
    ],
    crearUsuario);

router.post('/',
    [
        check('email', 'El email debe ser válido').isEmail(),
        check('password', 'El password debe tener al menos 6 caracteres').isLength({ min: 6 }),
        validateFields
    ],
    loginUsuario);


router.get('/renew', validateJWT, revalidarToken);



module.exports = router;