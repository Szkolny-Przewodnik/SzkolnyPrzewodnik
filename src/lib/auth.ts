import jwt from "jsonwebtoken"

const secret = process.env.JWT_SECRET as string

export function signToken(payload: object): string {
  return jwt.sign(payload, secret, { expiresIn: "1h" })
}

export function verifyToken(token: string): object | null {
  try {
    return jwt.verify(token, secret) as object
  } catch (error) {
    return null
  }
}
