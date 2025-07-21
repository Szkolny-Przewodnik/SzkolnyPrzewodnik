import { NextRequest, NextResponse } from "next/server"
import connect from "@/lib/database"
import Calendar from "@/lib/models/calendar"
import { authMiddleware } from "@/lib/middleware"
import { signToken, verifyToken } from "@/lib/auth"
import reqJson from "@/lib/reqJson"
// import calendarSP from "../../../../../temp/calendar.json"

class CalendarControler {
  async list() {
    const startYear = 2024
    const list = []

    for (let i: number = new Date().getFullYear(); i > startYear; i--) {
      list.push(i)
    }
    list.push(startYear)
    return list
  }

  async find(id: number) {
    connect()
    try {
      const res = await Calendar.findById(Number(id))
      if (res) {
        return NextResponse.json(res, { status: 200 })
      } else {
        return NextResponse.json({ Error: "Not Found" }, { status: 404 })
      }
    } catch (err) {
      console.error(err)
      return NextResponse.json({ Error: "Server error" }, { status: 500 })
    }
  }
  async create(req: NextRequest) {
    const body = await reqJson(req)
    if (body) {
      const token = req.headers.get("Authorization")?.split(" ")[1]

      if (!token) {
        return NextResponse.json(
          {
            message: "Authorization token required",
          },
          { status: 401 }
        )
      }

      if (!verifyToken(token)) {
        return NextResponse.json(
          { message: "Invalid or expired token" },
          { status: 401 }
        )
      }

      connect()

      if (!body.id) {
        return NextResponse.json({ error: "Bad Request" }, { status: 400 })
      }
      let calendar = await Calendar.findById(body.id)
      try {
        if (!calendar) {
          calendar = await new Calendar({
            _id: Number(body.id),
            dates: [],
          }).save()
          return NextResponse.json(
            { data: calendar, message: `Calendar ${body.id} was created` },
            { status: 200 }
          )
        } else {
          return NextResponse.json(
            { data: calendar, message: `Calendar ${body.id} is exists` },
            { status: 200 }
          )
        }
      } catch (err) {
        console.error(err)
        return NextResponse.json({ error: "Server error" }, { status: 500 })
      }
    } else {
      return NextResponse.json(
        { error: "Bad Request (Required Json Request)" },
        { status: 400 }
      )
    }
  }

  //Year Delete
  async remove(req: NextRequest) {
    const body = await reqJson(req)
    if (body) {
      const token = req.headers.get("Authorization")?.split(" ")[1]

      if (!token) {
        return NextResponse.json(
          {
            message: "Authorization token required",
          },
          { status: 401 }
        )
      }

      if (!verifyToken(token)) {
        return NextResponse.json(
          { message: "Invalid or expired token" },
          { status: 401 }
        )
      }

      connect()

      try {
        await Calendar.findByIdAndDelete(Number(body.id))
        return NextResponse.json(
          {
            data: { delete: "deleted" },
            message: `Calendar ${body.id} deleted`,
          },
          { status: 200 }
        )
      } catch (err) {
        console.error(err)
        return NextResponse.json({ error: "Server error" }, { status: 500 })
      }
    } else {
      return NextResponse.json(
        { error: "Bad Request (Required Json Request)" },
        { status: 400 }
      )
    }
  }

  // ******************
  // PER YEAR
  // ******************

  // REMOVE DATE UPDATE
  async removeDate(req: NextRequest, params: any) {
    const body = await reqJson(req)
    if (body) {
      const token = req.headers.get("Authorization")?.split(" ")[1]

      if (!token) {
        return NextResponse.json(
          {
            message: "Authorization token required",
          },
          { status: 401 }
        )
      }

      if (!verifyToken(token)) {
        return NextResponse.json(
          { message: "Invalid or expired token" },
          { status: 401 }
        )
      }

      connect()
      if (!body._id) {
        return NextResponse.json(
          { message: "Bad Request (Bad Data)" },
          { status: 400 }
        )
      }
      let calendar: any
      try {
        calendar = await Calendar.findByIdAndUpdate(
          Number(params.year),
          { $pull: { dates: { _id: body._id } } },
          { upsert: true, new: true }
        )
        return NextResponse.json(
          {
            data: { data: calendar },
            message: `Calendar ${body._id} deleted`,
          },
          { status: 200 }
        )
      } catch (err) {
        console.error(err)
        return NextResponse.json({ error: "Server error" }, { status: 500 })
      }
    } else {
      return NextResponse.json(
        { error: "Bad Request (Required Json Request)" },
        { status: 400 }
      )
    }
  }

  async createDate(req: NextRequest, params: any) {
    const body = await reqJson(req)
    if (body) {
      const token = req.headers.get("Authorization")?.split(" ")[1]

      if (!token) {
        return NextResponse.json(
          {
            message: "Authorization token required",
          },
          { status: 401 }
        )
      }

      if (!verifyToken(token)) {
        return NextResponse.json(
          { message: "Invalid or expired token" },
          { status: 401 }
        )
      }

      connect()
      if (!body.dates || !body.title || !body.perms) {
        return NextResponse.json(
          { message: "Bad Request (Bad Data)" },
          { status: 400 }
        )
      }

      let calendar: any
      try {
        calendar = await Calendar.findByIdAndUpdate(
          Number(params.year),
          { $push: { dates: body } },
          { upsert: true, new: true }
        )
        return NextResponse.json(
          { data: calendar, message: `Calendar ${params.year} updated` },
          { status: 200 }
        )
      } catch (err) {
        console.error(err)
        return NextResponse.json({ error: "Server error" }, { status: 500 })
      }
    } else {
      return NextResponse.json(
        { error: "Bad Request (Required Json Request)" },
        { status: 400 }
      )
    }
  }
  async updateDate(req: NextRequest, params: any) {
    const body = await reqJson(req)
    if (body) {
      const token = req.headers.get("Authorization")?.split(" ")[1]

      if (!token) {
        return NextResponse.json(
          {
            message: "Authorization token required",
          },
          { status: 401 }
        )
      }

      if (!verifyToken(token)) {
        return NextResponse.json(
          { message: "Invalid or expired token" },
          { status: 401 }
        )
      }

      connect()
      if (!body._id) {
        return NextResponse.json(
          { message: "Bad Request (Bad Data)" },
          { status: 400 }
        )
      }

      let calendar: any
      try {
        const findDate = await Calendar.findById(Number(params.year))

        const newDate: [{ dates: []; title: string; perms: []; _id: string }] =
          { ...findDate }._doc.dates
        const indexDate: number = newDate.findIndex(el => el._id == body._id)
        if (indexDate != -1) {
          if (body.dates) newDate[indexDate].dates = body.dates
          if (body.title) newDate[indexDate].title = body.title
          if (body.perms) newDate[indexDate].perms = body.perms
        } else {
          return NextResponse.json(
            { message: "Bad Request (Bad _id)" },
            { status: 400 }
          )
        }
        Calendar.findByIdAndUpdate(
          Number(params.year),
          { $pull: { dates: { _id: body._id } } },
          { upsert: true, new: true }
        ).then(async () => {
          calendar = await Calendar.findByIdAndUpdate(
            Number(params.year),
            { $push: { dates: newDate[0] } },
            { upsert: true, new: true }
          )
        })

        return NextResponse.json(
          { data: calendar, message: `Calendar ${params.year}} updated` },
          { status: 200 }
        )
      } catch (err) {
        console.error(err)
        return NextResponse.json({ error: "Server error" }, { status: 500 })
      }
    } else {
      return NextResponse.json(
        { error: "Bad Request (Required Json Request)" },
        { status: 400 }
      )
    }
  }
}
export default new CalendarControler()
