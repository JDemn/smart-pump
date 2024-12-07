import { Router } from "express";
import { updateUser } from "../controller/user.js";
import { jwtValidation } from "../middlewares/jwtValidation.js";

const router = new Router;

/**
 * @route PUT /api/user/update
 * @description Allow users edit his data
 * @access Private
 */

router.put('/update/:userId',[
    jwtValidation
],updateUser);


export default router;