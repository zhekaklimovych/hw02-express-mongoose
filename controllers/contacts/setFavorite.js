import Contact from "../../models/Contact.js";

import { createError } from "../../helpers/index.js";

const setFavorite = async (req, res) => {
    const { id } = req.params;
    const ID = await Contact.findById(id);
    if (!ID) throw createError(404, "Not found");

    const {favorite} = req.body;
    if(favorite === undefined) throw createError(400, "missing field favorite")

    const result = await Contact.findByIdAndUpdate(id, favorite, {new: true});

    res.status(200).json(result);
}

export default setFavorite;