import { Router } from "express";
import { updateUser } from "../controller/user.js";
import { jwtValidation } from "../middlewares/jwtValidation.js";
import { body } from 'express-validator';
import { fieldValidation } from "../middlewares/fieldValidation.js";

const router = new Router;

/**
 * @route PUT /api/user/update:userId
 * @description Allow users edit his data
 * @access Private
 */

router.put('/update/:userId', [
    jwtValidation,
    body('age')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Age must be a valid number and non-negative.'),
    body('phone')
        .optional()
        .matches(/^\+?[0-9\s\-\(\)]+$/) 
        .withMessage('Phone must be a valid format, e.g., +1 (983) 565-2711.')
        .notEmpty()
        .withMessage('Phone cannot be empty.'),
    body('email')
        .optional()
        .isEmail()
        .withMessage('the email is not valid')
        .notEmpty()
        .withMessage('email cannot be empty.'),
    fieldValidation
], updateUser);


export default router;