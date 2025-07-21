import mongoose from "mongoose"
const { Schema, model } = mongoose

const date = new Schema({
  dates: [String],
  title: String,
  perms: [String],
})

const CalendarSchema = new Schema({
  _id: String,
  dates: [date],
})

const Calendar = mongoose.models.Calendar || model("Calendar", CalendarSchema)

export default Calendar
