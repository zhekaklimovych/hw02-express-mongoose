import mongoose from "mongoose";
import Joi from "joi";

const {Schema, model} = mongoose;

const contactSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: String, required: true, unique: true, match: /\([0-9]{3}\) [0-9]{3}-[0-9]{4}/},
    favorite: {type: Boolean, default: false}
},{versionKey: false, timestamps: true});

const add = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.bool()
});

const updateFavorite = Joi.object({
    favorite: Joi.bool().required()
});

export const schemas = {
    add,
    updateFavorite,
}

const handleErrors = (error, data, next)=> {
    const {name, code} = error;
    if(name === "MongoServerError" && code === 11000) {
        error.status = 409;
    } else {
        error.status = 400;
        error.message = "missing required name field";
    }
    next()
}

contactSchema.post("save", handleErrors);

const Contact = model("contacts", contactSchema);

export default Contact;
