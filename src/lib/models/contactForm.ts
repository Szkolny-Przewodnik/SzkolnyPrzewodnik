import mongoose from "mongoose"
const { Schema, model } = mongoose

const ContactSchema = new Schema({
  name: String,
  email: String,
  description: String,
})

const Contact = mongoose.models.Contact || model("Contact", ContactSchema)

export default Contact
