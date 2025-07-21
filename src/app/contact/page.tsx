"use client"
import Footer from "@/components/UI/footer/footer"
import Topbar from "@/components/UI/navbar/topbar"
import { useState } from "react"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"

const Home: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [response, setResponse] = useState("")
  const [isError, setError] = useState(false)

  const { executeRecaptcha } = useGoogleReCaptcha()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setResponse("")
    setError(false)

    if (!executeRecaptcha) {
      setError(true)
      setResponse("Błąd ReCaptcha")
      return
    }

    const token = await executeRecaptcha("get_price")

    const data = new FormData()
    data.append("name", formData.name)
    data.append("email", formData.email)
    data.append("message", formData.message)
    data.append("token", token)

    try {
      const response = await fetch("/api/v1/contact", {
        method: "POST",
        body: data,
      }).then(res => {
        return res.json()
      })

      if (response.ok) {
        setResponse(response.message)
        setError(false)
        setFormData({ name: "", email: "", message: "" })
      } else {
        setError(true)
        setResponse(response.message)
      }
    } catch (error) {
      setError(true)
      setResponse("Błąd podczas wysyłania: " + error)
    } finally {
      const target = e.target as HTMLFormElement
      target.reset()
    }
  }
  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Kontakt",
          "url": "https://szkolnyprzewodnik.edu.pl/contact",
          "description": "Masz jakieś pytania lub potrzebujesz wsparcia? Jesteśmy tu, aby Ci pomóc!",
          "mainEntityOfPage": "https://szkolnyprzewodnik.edu.pl/contact",
          "author": {
            "@type": "Person",
            "name": "Szkolny Przewodnik"
          },
          "image": {
            "@type": "ImageObject",
            "url": "https://szkolnyprzewodnik.edu.pl/thumbnail.png",
            "width": 1200,
            "height": 630
          },
        })
      }}
    />
      <Topbar />
      <main className='py-52 px-0 *:focus:outline-none  min-h-[70vh] flex items-center'>
        <section
          className='container grid grid-cols-[2fr,1fr] gap-x-4 shadow-2xl shadow-black rounded-[20px] overflow-hidden bg-sectionbg'
          style={{ padding: 0 }}>
          <div className='p-14'>
            <h2 className='text-white16 text-7xl leading-[1.05] mb-7 font-bold'>
              Masz pytanie? Pisz śmiało!
            </h2>
            <p className='text-white48 leading-[1.2] mb-12 text-2xl font-medium'>
              Wypełnij formularz kontaktowy, a udzielimy ci odpowiedzi.
            </p>

            <form
              className='grid grid-cols-2 gap-x-12 gap-y-10 '
              onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor='name'
                  className='text-white48 block text-2xl font-semibold mb-5'>
                  Imię
                </label>
                <input
                  id='name'
                  type='text'
                  placeholder='Adam'
                  required
                  className='w-full p-5 text-3xl  text-inherit border-none bg-white5 rounded-lg shadow-sm shadow-black placeholder:text-[#aaa]'
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor='email'
                  className='text-white48 block text-2xl font-semibold mb-5'>
                  Adres e-mail
                </label>
                <input
                  id='email'
                  type='email'
                  placeholder='adam@przyklad.pl'
                  required
                  className='w-full p-5 text-3xl text-inherit border-none bg-white5 rounded-lg shadow-sm shadow-black placeholder:text-[#aaa]'
                  onChange={handleChange}
                />
              </div>
              <div className='col-span-2'>
                <label
                  htmlFor='message'
                  className='text-white48 block text-2xl font-semibold mb-5'>
                  Twoja wiadomość
                </label>
                <textarea
                  id='message'
                  placeholder='Twoja wiadomość'
                  required
                  className='min-h-60 w-full p-5 text-3xl text-inherit border-none bg-white5 rounded-lg shadow-sm shadow-black placeholder:text-[#aaa]'
                  onChange={handleChange}
                />
              </div>

              <div className='col-start-1 col-span-2 my-0 mx-auto'>
                <button
                  className='border-none px-10 py-5 text-xl bg-btn text-white no-underline block mx-0 my-auto rounded-lg transition-all duration-300 hover:scale-110'
                  type='submit'>
                  Wyślij
                </button>
              </div>
            </form>
            <h1
              className={`text-2xl text-center mt-10 text-white16 ${
                isError ? "text-red-600" : ""
              }`}>
              {response}
            </h1>
          </div>

          <div
            className='bg-cover sm:row-span-1 sm:w-full'
            style={{
              backgroundImage:
                "linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url('/contact/contact.jpg')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "scroll",
              opacity: 0,
              transition: "opacity 1s ease-in-out",
            }}
            ref={el => {
              const img = new Image()
              img.src = "/contact/contact.jpg"
              img.onload = () => {
                if (el) {
                  el.style.opacity = "1"
                }
              }
            }}></div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Home
