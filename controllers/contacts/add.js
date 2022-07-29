import Contact from "../../models/Contact.js";

const add = async (req, res) => {
    const result = await Contact.create(req.body);
    const contact = {
        id: result._id,
        name: result.name,
        email: result.email,
        phone: result.phone
    }
    res.status(201).json(contact);
}

export default add;