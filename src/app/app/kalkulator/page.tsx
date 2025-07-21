"use client"
import Footer from "@/components/UI/footer/footer"
import Topbar from "@/components/UI/navbar/topbar"
import { useEffect, useRef } from "react"
import Lessons from "@/Enums/lessons"
import Exam from "@/components/app/calculator/exams"
import Cert from "@/components/app/calculator/cert"
import Other from "@/components/app/calculator/other"
import Emitter from "@/utils/EventEmitter"
import Contest from "@/components/app/calculator/contest"
import useToggle from "@/hooks/useToggle"
import ContestsJson from "@/content/contests.json"

const Calculator: React.FC = () => {
  const { isTrue, handleToggle } = useToggle(false)
  Emitter.emit("submit")

  const uzyskane = useRef<HTMLInputElement | null>(null)
  useEffect(() => {
    if (uzyskane.current) uzyskane.current.value = "0"
  }, [uzyskane])

  const wynikKonkursy = useRef<HTMLInputElement | null>(null)
  Emitter.on("submit", () => {
    if (uzyskane.current) {
      let uzyskaneWynik = 0
      const wyniki: NodeListOf<HTMLInputElement> =
        document.querySelectorAll(".points")
      try {
        wyniki.forEach(el => {
          uzyskaneWynik += Number(el.value) ? Number(el.value) : 0
        })
      } catch (error) {
        console.log(error)
      } finally {
        uzyskane.current.value = String(uzyskaneWynik)
      }
    } else { /* empty */ }
  })

  const wyniki: { [key: number]: number } = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  }

  Emitter.on("konkurs", (Numbers: number, points: number) => {
    let wynik = 0
    if (wynikKonkursy.current) {
      wyniki[Numbers] = points

      for (const point of Object.values(wyniki)) {
        wynik += point
      }

      wynikKonkursy.current.value = String(wynik > 18 ? 18 : wynik)
    }
    Emitter.emit("submit")
  })

  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Kalkulator",
          "url": "https://szkolnyprzewodnik.edu.pl/app/kalkulator",
          "description": "Szybko i prosto oblicz punkty rekrutacyjne do szkoły średniej!",
          "mainEntityOfPage": "https://szkolnyprzewodnik.edu.pl/app/kalkulator",
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
      <main className='mb-4'>
        <section className='relative px-0 py-20'>
          <div
            className='container rounded-[40px] w-full px-28 py-20 bg-sectionbg text-white16 mb-28 bg-cover bg-center bg-no-repeat'
            style={{
              backgroundImage:
                "linear-gradient(rgba(34, 34, 34, 0.7),rgba(34, 34, 34, 0.7)), url(/calculator/exams.jpg)",
            }}>
            <h1 className='text-center text-[4.6rem] font-semibold'>
              Egzamin ósmoklasisty
            </h1>
            <hr></hr>
            <form className='w-full mt-10 flex flex-col gap-6 p-6'>
              {[
                ["Język polski", Lessons.POLSKI],
                ["Matematyka", Lessons.MATMA],
                ["Język obcy", Lessons.ANG],
              ].map((item, index) => (
                <Exam id={item[1]} index={index} name={item[0]} key={index} />
              ))}
            </form>
          </div>

          <div
            className='container rounded-[40px] w-full px-28 py-20 bg-sectionbg text-white16 mb-28 bg-cover bg-center bg-no-repeat'
            style={{
              backgroundImage:
                "linear-gradient(rgba(34, 34, 34, 0.7),rgba(34, 34, 34, 0.7)), url(/calculator/certs.png)",
            }}>
            <h1 className='text-center text-[4.6rem] font-semibold'>
              Świadectwo ukończenia szkoły podstawowej
            </h1>
            <hr></hr>
            <div className='w-full mt-10 flex flex-col gap-6 p-6'>
              {[
                "Język polski",
                "Matematyka",
                "Przedmiot 1*",
                "Przedmiot 2*",
              ].map((item, index) => (
                <Cert name={item} key={index} index={index} />
              ))}
            </div>
            <div className='text-center mt-5'>
              Przedmioty* - Przedmiot wybrany przez szkołę
            </div>
          </div>

          {[
            {
              name: "Świadectwo z wyróżnieniem",
              desc: "Wyróżnienie",
              points: "7",
            },
            {
              name: "Wolontariat",
              desc: "Wolontariat",
              points: "3",
            },
          ].map((item, index) => (
            <Other
              name={item.name}
              desc={item.desc}
              points={item.points}
              key={index}
            />
          ))}
          <div className='container rounded-[40px] w-full px-28 py-20 bg-sectionbg text-white16 mb-28'>
            <h1 className='text-center text-[4.6rem] font-semibold'>
              Konkursy
            </h1>
            <hr></hr>
            <div className='w-full mt-10 flex flex-col gap-6 p-6 text-[2.4rem]'>
              <p className='text-center'>
                Czy uzyskałeś tytuł laureata lub finalisty konkursu na minimum
                poziomie powiatu?
              </p>
              <div className='flex justify-between'>
                <button
                  className='w-48 text-2xl font-medium bg-btn text-white p-4 rounded-xl transition-all duration-300 hover:scale-110'
                  onClick={() => {
                    handleToggle()
                    Emitter.emit("toggleContest")
                    Emitter.emit("konkurs")
                  }}>
                  {isTrue ? "Nie" : "Tak"}
                </button>
                <input
                  type='text'
                  disabled
                  value='0'
                  className='bg-white48 w-40 p-1 rounded-xl text-heading text-center outline-none text-3xl points'
                  ref={wynikKonkursy}
                />
              </div>
              <form className={isTrue ? " " : "hidden"}>
                {ContestsJson.map((contest, index) => (
                  <Contest
                    title={contest.title}
                    inputs={contest.inputs}
                    indexContest={index}
                    key={index}
                  />
                ))}
              </form>
            </div>
          </div>
          <div className='fixed flex flex-col items-center bottom-0 left-2/4 translate-x-[-50%] pt-4 px-8 pb-0 rounded-t-[40px] text-center bg-btn shadow-xl shadow-black'>
            <h1 className='text-4xl text-white16 font-normal mb-3'>Punkty</h1>
            <input
              type='text'
              disabled
              className=' bg-[#ddd] w-40 p-3 rounded-t-xl text-heading text-4xl text-center outline-none'
              ref={uzyskane}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Calculator
