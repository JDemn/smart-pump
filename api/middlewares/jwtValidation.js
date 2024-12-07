import { response, request } from 'express';
import jwt from'jsonwebtoken';
import { ERROR_MESSAGES } from '../constants/constants.js';

/**
 * @middleware jwtValidation
 * @description Middleware to validate the JWT (JSON Web Token) provided in the request headers.
 * It checks if the token is present and valid. If the token is missing or invalid, it returns an appropriate error response.
 * @param {Object} req - HTTP request object, expects a `token` header.
 * @param {Object} res - HTTP response object.
 * @param {Function} next - Function to pass control to the next middleware.
 *
 * This middleware extracts the token from the request header, verifies it using the secret key, and checks if the user associated
 * with the token exists and is active. If the token is expired or invalid, it responds with a 401 or 403 status code and a relevant
 * message. If successful, the user data is attached to the request object for future use in the route.
 *
 * Responses:
 * - 401: No token provided, or token is invalid.
 * - 403: Token has expired.
 */
export const jwtValidation = async( req = request ,res = response , next ) => {
    const token = req.header('token');
    if(!token) {
        return res.status(401).json({
            msg : ERROR_MESSAGES?.NOT_TOKEN_PROVIDED
        });
    }
    if (!process.env.SECRETORPRIVATEKEY) {
        return res.status(500).json({
            msg: ERROR_MESSAGES?.MISSING_SECRET_CONFIGURATION,
        });
    }
    try {
        /*const decoded = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        console.log("Decodificación exitosa del token:", decoded); */
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        if (!uid) {
            return res.status(401).json({ msg: ERROR_MESSAGES?.TOKEN_OR_UID_NOT_vALID });
        }

        const db = req.app.locals.db;

        if (!db) {
            return res.status(500).json({ msg: ERROR_MESSAGES?.DB_UNREACHEABLE });
        }

        await db.read();
        const users = db.data?.users || [];
        
        const user = users.find((user) => user._id === uid);

        if( !user ){
            return res.status(401).json({
                msg : ERROR_MESSAGES?.INVALID_TOKEN_OR_USER_DOESNT_EXIST
            }) 
        }

        if( !user.isActive ){
            return res.status(401).json({
                msg : ERROR_MESSAGES?.INVALID_TOKEN
            })
        }

        req.user = user;

        next()
    }catch(error){        
        if(error.name === 'TokenExpiredError'){
            return res.status(403).json({ msg: ERROR_MESSAGES?.EXPIRED_TOKEN });
        }else {
            return res.status(401).json({
                msg : ERROR_MESSAGES?.INVALID_TOKEN
            })
        }
    }
}