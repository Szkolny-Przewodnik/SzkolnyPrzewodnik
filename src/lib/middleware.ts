import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "./auth"

interface AuthenticatedRequest extends NextRequest {
  user?: object
}

export async function authMiddleware(req: AuthenticatedRequest) {
  const token = req.headers.get("Authorization")?.split(" ")[1]

  if (!token) {
    return {
      message: "Authorization token required",
    }
  }

  if (!verifyToken(token)) {
    return { message: "Invalid or expired token" }
  }
}
