import mongoose from "mongoose"
import consola from "consola"
import chalk from "chalk"

const MONGODB_URI =
  String(process.env.MONGODB_URI) || "mongodb://localhost:27017/"

export default async function connect() {
  const connectionState = mongoose.connection.readyState

  if (connectionState === 1) {
    return
  }

  if (connectionState === 2) {
    console.log("Connecting...")
    return
  }

  try {
    mongoose.set("strictQuery", true)
    mongoose.connect(MONGODB_URI)
    mongoose.connection.on("error", err => {
      console.error(
        chalk.redBright("Could not connect to the database. Exiting now...")
      )
    })

    mongoose.connection.on("connection", () => {
      consola.success(chalk.greenBright("Connection success!"))
    })
  } catch (err: any) {
    throw new Error("Error: ", err)
  }
}
