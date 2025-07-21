import { NextRequest, NextResponse } from "next/server"
import connect from "@/lib/database"
import SchoolSchema from "@/lib/models/school"
import mongoose from "mongoose"
const { Schema, model } = mongoose

class SchoolsController {
  async find(req: NextRequest, params: { [key: string]: string }) {
    const { searchParams } = req.nextUrl
    const query = searchParams.get("q")
    const fields = searchParams.get("fields")?.split(",") || []
    const per_page = parseInt(searchParams.get("per_page")!) || 5
    const offset = parseInt(searchParams.get("offset")!) || 0

    await connect()

    let sort_by = {}
    let filters = {}
    const projection: any = {}

    const schools =
      mongoose.models[params.district_id] ||
      model(params.district_id, SchoolSchema)

    if (query) {
      filters = {
        name: { $regex: query, $options: "i" },
      }
    }
    fields.forEach(field => {
      projection[field] = 1
    })

    const filtredSchools = await schools
      .find(filters, projection)
      .skip(offset)
      .limit(per_page > 10 ? 10 : per_page)
      .sort(sort_by)
      .lean()

    return NextResponse.json(filtredSchools, { status: 200 })
  }
}
export default new SchoolsController()
