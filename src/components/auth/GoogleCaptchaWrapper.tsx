"use client"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"
import React from "react"

export default function GoogleCaptchaWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RC_SITE!}>
      {children}
    </GoogleReCaptchaProvider>
  )
}
