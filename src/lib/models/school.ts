import mongoose from "mongoose"
const { Schema, model } = mongoose
export enum ProfileType {
  TECHNIKUM = 1,
  LICEUM = 2,
  ZAWODOWKA = 3,
  NIEWIEM = 4,
}

const Profile = new Schema({
  name: String,
  type: Number,
  tags: [String],
  extensions: [String],
  extensionsOpt: [String],
  img: String,
})

const SchoolSchema = new Schema({
  _id: String,
  name: String,
  url: String,
  paid: Boolean,
  img: String,
  results: {
    math: Number || 0,
    polish: Number || 0,
    aliens: Number || 0,
  },
  profiles: [Profile],
})

export default SchoolSchema
