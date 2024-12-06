import { logger } from '../helpers/logger.js';
import { response, request } from'express';

/**
 * Logs the details of incoming requests.
 * @middleware
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - Passes control to the next middleware.
 */

export const logRequestDetails = (req = request, res = response, next) => {
    logger.info(`[${req?.method}] ${req?.originalUrl} - Success operation`);
    next();
};