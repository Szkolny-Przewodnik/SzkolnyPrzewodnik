import { NextRequest, NextResponse } from "next/server"
import DistrictController from "@/Controllers/DistrictController"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  return DistrictController.find(req)
}
