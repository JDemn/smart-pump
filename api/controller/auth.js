
import bcryptjs from'bcryptjs';
import { response } from 'express';
import { createJWT } from '../helpers/createJWT.js';
import { ERROR_MESSAGES } from '../constants/constants.js';
/**
 * @function auth
 * @description Handles user authentication by validating email and password. If successful, it generates a JWT token for the authenticated user.
 * @param   {Object} req - Express request object containing email and password in the body.
 * @param   {string} req.body.email - The email address provided by the user.
 * @param   {string} req.body.password - The password provided by the user.
 * @param   {Object} res - Express response object used to send back the authentication result.
 * @returns {Object} 200 - Returns the authenticated user and a JWT token if successful.
 * @returns {Object} 400 - Returns an error message if the user credentials are incorrect or the account is inactive.
 * @returns {Object} 500 - Returns an error message if there is an internal server error.
 * 
 * @throws {Error} If any error occurs during authentication, returns a 500 error response.
 * 
 * @example
 * // Request body
 * {
 *   "email": "example@example.com",
 *   "password": "password123"
 * }
 * 
 * // Successful response
 * {
 *   "usuario": { ...userData },
 *   "token": "jwtTokenHere"
 * }
 */
export const auth = async (req, res = response, next) => {
    try {
        const { email, password } = req.body;
        
        const db = req.app.locals.db;

        if (!db) {
            return res.status(500).json({ msg: ERROR_MESSAGES?.DB_UNREACHEABLE });
        }

        await db.read();
        const users = db.data?.users || [];
        
        const usuario = users.find((user) => user.email === email);

        if (!usuario) {
            return res.status(400).json({ msg: ERROR_MESSAGES?.NOT_VALID_USER });
        }
        if (!usuario.isActive) {
            return res.status(403).json({ msg: ERROR_MESSAGES?.INACTIVE_USER });
        }

        //const validarContrasena = await bcryptjs.compare(password, usuario.password);
        const validarContrasena = users.find((user) => user.password === password);
        if (!validarContrasena) {
            return res.status(400).json({
                msg: ERROR_MESSAGES?.NOT_VALID_USER
            });
        }

        const token = await createJWT(usuario._id);

        return res.status(200).json({
            usuario: {
                _id: usuario._id,
                email: usuario.email,
                name: `${usuario.name.first} ${usuario.name.last}`,
                isActive: usuario.isActive,
            },
            token
        });
    } catch (error) {
        next(error);
    }
};