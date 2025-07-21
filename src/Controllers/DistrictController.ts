import { NextRequest, NextResponse } from "next/server"
import connect from "@/lib/database"
import SchoolSchema from "@/lib/models/school"
import mongoose from "mongoose"
import Districts from "@/lib/models/districts"

class DistrictController {
  async find(req: NextRequest, params?: { [key: string]: string }) {
    const { searchParams } = req.nextUrl
    const query = searchParams.get("q")
    const id = searchParams.get("id") || null
    const fields = searchParams.get("fields")?.split(",") || []
    const per_page = parseInt(searchParams.get("per_page")!) || 5
    const offset = parseInt(searchParams.get("offset")!) || 0

    await connect()

    let sort_by = {}
    let filters = {}
    const projection: any = {}

    fields.forEach(field => {
      projection[field] = 1
    })

    if (query && !id) {
      filters = {
        name: { $regex: query, $options: "i" },
      }
    }
    if (id && !query) {
      filters = { _id: id }
    }
    const filtredDistricts = await Districts.find(filters, projection)
      .skip(offset)
      .limit(per_page > 10 ? 10 : per_page)
      .sort(sort_by)
      .lean()

    return NextResponse.json(filtredDistricts, { status: 200 })
  }
}
export default new DistrictController()
