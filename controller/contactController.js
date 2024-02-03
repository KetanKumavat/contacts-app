const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const contactModel = require("../models/contactModel");

// @desc: GET ALL CONTACTS
//@route: GET /api/contacts
//@acess: public

const getContacts = async (req, res) => {
  const contacts = await Contact.find({user_id: req.user.id});
  res.status(200).json(contacts);
};

const createContact = asyncHandler(async (req, res) => {
  console.log("the req body is:", req.body);
  const { name, email, phone, type } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Please fill all fields");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  })
  res.status(201).json(contact);
});

const getContact = asyncHandler(async (req, res) => {
  var id = req.params.id;
  const contact = await Contact.findById(id);
  if(!contact){
    res.status(404);
    throw new Error("Contact Not Found");
  }
  res.status(200).json(contact);
});


const updateContact = asyncHandler(async (req, res) => {
  var id = req.params.id;
  const contact = await Contact.findById(id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "User Don't have the permission to update other user's Contacts"
    );
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true}
);
  res.status(200).json(updatedContact);
});

const deleteContact = asyncHandler(async (req, res) => {
  var id = req.params.id;
  const contact = await Contact.findById(id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "User Don't have the permission to update other user's Contacts"
    );
  }
  await Contact.deleteOne({_id: req.params.id});
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};