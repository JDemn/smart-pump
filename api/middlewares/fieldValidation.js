import { response, request } from'express';
import { validationResult } from 'express-validator';
import { ERROR_MESSAGES } from '../constants/constants.js';

/**
 * @middleware
 * @description This validate the body or param entries, it return an error if exist. 
 * @param req Express request object
 * @param res Express response object
 * @returns {Object} 400 - Error message if the request body is empty
 * @returns {Object} 500 - Server error message
 */
export const fieldValidation =( req = request, res = response, next ) =>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){return res.status(400).json(errors)}
        
        next();

    }catch(err){
        next( err )
    }
}