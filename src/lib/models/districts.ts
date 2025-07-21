import mongoose from "mongoose"
const { Schema, model } = mongoose

const SchoolsSchema = new Schema({
  _id: String,
  name: String,
  address: String,
  type: [String],
})

export const DistrictsSchema = new Schema({
  _id: String,
  name: String,
  voivodeship: String,
  capital: String,
  banner: String,
  emblem: [String],
  url: String,
  used: Number,
  beta: Boolean,
  tags: [String],
  extensions: [String],
  schools: [SchoolsSchema],
})

const Districts =
  mongoose.models.Districts || model("Districts", DistrictsSchema)

export default Districts
