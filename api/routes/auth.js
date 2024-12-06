import { Router } from 'express';
import { check } from 'express-validator';
import { fieldValidation } from '../middlewares/fieldValidation.js';
import { auth } from '../controller/auth.js';
import { jwtValidation } from '../middlewares/jwtValidation.js';

const router = Router();


/**
 * @route POST /api/auth/login
 * @description Authenticate a user with email and password
 * @access Public
 */

router.post('/login',[
    check('email','El valor ingresado no tiene el aspecto de un correo').isEmail(),
    check('email','El correo es obligatorio').not().isEmpty(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    fieldValidation
],auth);


export default router;