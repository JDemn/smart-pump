import { response, request } from 'express';
import jwt from'jsonwebtoken';

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
            msg : 'No se ha proporcionado token de acceso en la petición'
        });
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        
        const db = req.app.locals.db;

        if (!db) {
            return res.status(500).json({ msg: 'Base de datos no disponible' });
        }

        await db.read();
        const users = db.data?.users || [];
        
        const user = users.find((user) => user._id === uid);

        console.log(`usuario nombre :${user}`)
        if( !user ){
            return res.status(401).json({
                msg : 'Token no válido, el usuario no existe'
            }) 
        }
        if( !user.state ){
            return res.status(401).json({
                msg : 'Token no válido'
            })
        }

        req.user = user;

        next()
    }catch(error){
        if(error.name === 'TokenExpiredError'){
            return res.status(403).json({ msg: 'El token ha expirado, favor de volver a inciar sesión' });
        }else {
            return res.status(401).json({
                msg : 'token no válido'
            })
        }
    }
}