import { NextRequest, NextResponse } from "next/server"
import CalendarControler from "@/Controllers/CalendarControler"

export function GET(req: NextRequest, context: { params: any }) {
  return CalendarControler.find(context.params.year)
}

export function POST(req: NextRequest, context: { params: any }) {
  return CalendarControler.createDate(req, context.params)
}
export function PUT(req: NextRequest, context: { params: any }) {
  return CalendarControler.updateDate(req, context.params)
}
export function DELETE(req: NextRequest, context: { params: any }) {
  return CalendarControler.removeDate(req, context.params)
}
