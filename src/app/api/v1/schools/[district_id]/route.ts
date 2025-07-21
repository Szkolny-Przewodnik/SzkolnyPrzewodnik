import SchoolsController from "@/Controllers/SchoolsController"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { district_id: string }
  }
) {
  // try {
  //   console.log(signToken({ id: "skibidi" }))
  // } catch (err) {
  //   console.error(err)
  // }
  return SchoolsController.find(req, params)
}
