import axios from "axios";

export async function verifyRecaptcha(token: string) {
  const secretKey = process.env.RC_SECRET;

  try {
    const res: any = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      `secret=${secretKey}&response=${token}`,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        timeout: 15000,
      }
    );
    const verify = res.data;

    if (verify.success && verify.score > 0.7) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("reCAPTCHA verification failed:", error.message);
    } else {
      console.error("reCAPTCHA verification failed:", error);
    }
    return false;
  }
}
