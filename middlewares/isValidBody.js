import {createError} from "../helpers/index.js";

const isValidBody = (req, res, next)=> {
    const {name, email, phone} = req.body;
    if(!name || !email || !phone) {
        return next(createError(400, "missing required name field"));
    }
    next();
}

export default isValidBody;