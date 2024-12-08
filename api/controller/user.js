import { request, response } from "express"
import { ERROR_MESSAGES, EditableFields, SUCCESS_RESPONSE_SERVER_MSG } from "../constants/constants.js"
import { filterEditableFields } from "../helpers/user.js";
/**
 * @description Allow users edit only data allowed
 * @param req express object
 * @method PUT
 * @route /api/user/update/userId
 * @param responde express response object 
 * @next express object
 * @returns { Object } user updated or server error response
 */
export const updateUser = async ( req = request , res = response , next )=> {
    try{
        const { guid , _id , isActive , balance , picture , ...data } = req.body;
        const { userId } = req.params;
        const db = req.app.locals.db;

        const filteredData = filterEditableFields(data,EditableFields);

        if (Object.keys(filteredData).length < 1) {
            return res.status(403).json({
                msg: ERROR_MESSAGES?.ACTION_NOT_ALLOWED,
            });
        }

        if( !db ){
            return res.status(400).json({
                msg : ERROR_MESSAGES?.DB_UNREACHEABLE
            })
        }

        await db.read();
        const users = db.data?.users || [];
        
        const user = users.find((user) => user._id === userId );
        if( !user ){
            return res.status(400).json({
                msg : ERROR_MESSAGES?.NOT_FOUND
            })
        }

        Object.assign( user, data);
        await db.write( user );

        return res.status(200).json({
            msg: SUCCESS_RESPONSE_SERVER_MSG?.DATA_UPDATED,
            user
        });

    }catch( err ){        
        next(err)
        return res.status(500).json({
            msg : ERROR_MESSAGES?.SERVER_ERROR
        })
    }
}