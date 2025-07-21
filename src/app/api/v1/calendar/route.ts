import { NextRequest, NextResponse } from "next/server"
import CalendarControler from "@/Controllers/CalendarControler"
import { signToken } from "@/lib/auth"

export async function GET(req: NextRequest) {
  try {
    console.log(signToken({ id: "skibidi" }))
    return NextResponse.json(await CalendarControler.list(), { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ Error: "Server error" }, { status: 500 })
  }
}

export function POST(req: NextRequest) {
  return CalendarControler.create(req)
}
export function DELETE(req: NextRequest) {
  return CalendarControler.remove(req)
}
