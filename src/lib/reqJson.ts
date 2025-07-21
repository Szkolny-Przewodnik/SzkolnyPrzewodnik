import { NextRequest } from "next/server"

export default async function reqJson(req: NextRequest) {
  try {
    const data = await req.json()
    return data
  } catch (error) {
    return false
  }
}
