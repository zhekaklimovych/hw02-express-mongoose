import Contact from "../../models/Contact.js";
import { createError } from "../../helpers/index.js";

const updateById = async (req, res) => {
    const { id } = req.params;
    const ID = await Contact.findById(id);
    if (!ID) throw createError(404, "Not found");

    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    res.json(result);
}

export default updateById;