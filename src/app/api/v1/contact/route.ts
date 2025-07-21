import { NextRequest, NextResponse } from "next/server"
import Contact from "@/lib/models/contactForm"
import connect from "@/lib/database"
import { verifyRecaptcha } from "@/lib/verifyRecaptcha"
import list from "../../../../../AntySwear.json"

export async function POST(req: NextRequest) {
  try {
    await connect()
    const data = await req.formData()

    const name = data.get("name")
    const email = data.get("email")
    const message: string = String(data.get("message"))
    const token: string = String(data.get("token"))

    if (!verifyRecaptcha(token))
      return NextResponse.json({
        message: "Wykryto bota, system wykrył podejrzane zachowanie.",
      })

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Nieprawidłowy formularz!" },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.toString())) {
      return NextResponse.json(
        { message: "Nieprawidłowy adres email!" },
        { status: 400 }
      )
    }

    if (message.length < 10) {
      return NextResponse.json(
        { message: "Wiadomość jest za krótka!" },
        { status: 400 }
      )
    }

    for (const word of list) {
      if (
        message.includes(word) ||
        email.toString().includes(word) ||
        name.toString().includes(word)
      ) {
        return NextResponse.json(
          { message: "Twoja wiadomość zawiera zakazane słowa!" },
          { status: 400 }
        )
      }
    }

    const contactForm = new Contact({
      name: name.toString(),
      email: email.toString(),
      description: message.toString(),
    })
    await contactForm.save()

    return NextResponse.json(
      { message: "Wiadomość została wysłana!" },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "Wystąpił błąd, proszę spróbować później!" },
      { status: 500 }
    )
  }
}
