
export const EditableFields = ['age', 'eyeColor', 'name', 'company','email','password','phone','address'];

export const API_ROUTES = {
    USERS: '/api/user',
    AUTH : '/api/auth',    
};

export const ERROR_MESSAGES = {
    NOT_FOUND: 'Resources not fonunds',
    UNAUTHORIZED: 'You dont have the correct permissions to access this resources',
    SERVER_ERROR: 'Server error',
    NOT_VALID_ROLE : 'A valid role is not being passed',
    DB_UNREACHEABLE : 'Data base unreacheable',
    NOT_VALID_USER : 'User / Password are not valid',
    INACTIVE_USER : 'The user is inactive',
    EMPTY_ENTRIES : 'Not data provided',
    ACTION_NOT_ALLOWED : 'Action not allowed',
    NOT_TOKEN_PROVIDED : 'No access token has been provided in the request.',
    MISSING_SECRET_CONFIGURATION : 'Missing server configuration: SECRETORPRIVATEKEY is not set',
    TOKEN_OR_UID_NOT_vALID : 'Invalid token, uid not found',
    INVALID_TOKEN_OR_USER_DOESNT_EXIST : 'Invalid token, user does not exist',
    INVALID_TOKEN : 'Invalid token',
    EXPIRED_TOKEN : 'Token has expired, please log in again.',
    UNABLE_TO_GENERATE_JWT : 'JWT could not be generated'
};

export const SUCCESS_RESPONSE_SERVER_MSG = {
    DATA_UPDATED : 'Data updated successfully'
}