"use client"
import { useRef, useState } from "react"
import Topbar from "@/components/UI/navbar/topbar"
import Footer from "@/components/UI/footer/footer"
import WojJson from "@/content/woj.json"
import useApi from "@/hooks/useApi"
import PolandMap from "@/components/Maps/PolandMap"
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline"

const Calendar = () => {
  const [year, setYear] = useState(
    new Date().getMonth() < 8
      ? new Date().getFullYear() - 1
      : new Date().getFullYear()
  )
  const [month, setMonth] = useState(new Date().getMonth())

  const [disctrict, setDistrict] = useState(WojJson.ALL.code)

  let state = useApi(`/v1/calendar/${year}`)

  const months = [
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Październik",
    "Listopad",
    "Grudzień",
  ]
  let yearState = year
  if (month < 8) yearState += 1
  const renderCalendarDates = (month: number) => {
    const monthEvents: any = []
    const firstDay = new Date(yearState, month, 1).getDay()
    const lastDate = new Date(yearState, month + 1, 0).getDate()
    const prevLastDate = new Date(yearState, month, 0).getDate()
    const startDay = firstDay === 0 ? 6 : firstDay - 1

    state.data.dates.forEach(
      (event: { dates: [string]; title: string; perms: [string] }) => {
        event.dates.forEach(date => {
          const eventDate = new Date(date)
          if (eventDate.getMonth() === month) {
            if (
              event.perms.find(el => el == disctrict || el == WojJson.ALL.code)
            )
              monthEvents[eventDate.getDate()] = {
                title: event.title,
              }
          }
        })
      }
    )

    const dates = []
    for (let i = startDay; i > 0; i--) {
      dates.push(
        <div key={`prev-${month}-${i}`} className='text-[#aaa]'>
          {prevLastDate - i + 1}
        </div>
      )
    }

    for (let i = 1; i <= lastDate; i++) {
      const isSunday = new Date(yearState, month, i).getDay() === 0

      const today =
        new Date().getMonth() == month && new Date().getDate() == i
          ? "text-[#00c3ff]"
          : ""
      dates.push(
        <div
          key={month + i}
          className={`${monthEvents[i] ? "text-[rgb(179,0,0)]" : ""} ${
            isSunday ? "text-[rgb(214,0,0)]" : ""
          } ${today}`}>
          {i}
          {monthEvents[i] ? <span>{monthEvents[i].title}</span> : ""}
        </div>
      )
    }
    return dates
  }

  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Kalendarz",
          "url": "https://szkolnyprzewodnik.edu.pl/app/kalendarz",
          "description": "Sprawdź dni wolne i zaplanuj swój rok szkolny perfekcyjnie już teraz!",
          "mainEntityOfPage": "https://szkolnyprzewodnik.edu.pl/app/kalendarz",
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
      <main className='min-h-[50vh] flex flex-col justify-center items-center h-full bg-[#f0f0f0] '>
        <section className='py-24 px-4 md:px-10 lg:px-20'>
          <div className='p-10 md:p-20 shadow-xl shadow-gray-700 rounded-3xl bg-sectionbg overflow-hidden flex flex-col lg:flex-row items-center gap-8 transition-all duration-300 justify-around'>
            <div className='text-center lg:w-1/2'>
              <h1 className='text-4xl md:text-5xl text-white16 select-none mb-6 font-bold'>
                Wybierz swoje Województwo
              </h1>
              <h2 className='text-3xl md:text-4xl text-white16 select-none mb-6'>
                Wybrane Województwo:
                <br />
                <span className='font-semibold'>
                  {" " +
                    Object.values(WojJson).find(el => el.code === disctrict)
                      ?.title}
                </span>
              </h2>
              <h3 className='text-white48 text-base md:text-lg select-none italic'>
                Uwaga! W twojej szkole mogą być dodatkowe dni wolne! <br />
                Spowodowane Rozporządzeniem Ministra Edukacji Narodowej w
                sprawie organizacji roku szkolnego § 5 ust. 1 tego
                rozporządzenia.
              </h3>
            </div>
            <div
              className='shadow-custom shadow-gray rounded-3xl p-6 lg:p-10 transition-transform transform hover:scale-105'
              style={{
                backgroundImage:
                  "linear-gradient(to right bottom, #333350, #191936)",
              }}>
              <PolandMap district={disctrict} setDistrict={setDistrict} />
            </div>
          </div>
        </section>

        <section className='p-0 w-full flex flex-col items-center'>
          {state.loading ? (
            <h1 className='text-[5.2rem] text-center font-bold text-[#111]'>
              Wczytywanie...
            </h1>
          ) : state.error ? (
            <h1 className='text-[#ff0000]'>
              Wystąpił błąd podczas wcztywania!
            </h1>
          ) : (
            <div className={`w-full pb-36 px-0 mb-20bg-sectionbg`} key={month}>
              <div
                className={`bg-white shadow-custom shadow-[rgba(0,0,0,0.2)] rounded-xl container p-8`}>
                <div className='flex justify-around items-center p-5 text-[#333] text-[5.2rem]'>
                  {month != 8 ? (
                    <button
                      className='outline-none border-none h-16 w-16 rounded-full shadow-inner cursor-pointer flex items-center justify-center hover:scale-110 hover:bg-white48 transition-all duration-300'
                      onClick={() => {
                        setMonth(month === 0 ? 11 : month - 1)
                      }}
                      aria-label='Previous'>
                      <ChevronLeftIcon className='h-12 w-12 stroke-btn' />
                    </button>
                  ) : (
                    <div></div>
                  )}
                  <span className='w-3/6 flex justify-center'>{`${months[month]} ${yearState}`}</span>
                  {month != 7 ? (
                    <button
                      className='outline-none border-none h-16 w-16 rounded-full shadow-inner cursor-pointer flex items-center justify-center hover:scale-110 hover:bg-white48 transition-all duration-300'
                      onClick={() => {
                        setMonth(month === 11 ? 0 : month + 1)
                      }}
                      aria-label='Previous'>
                      <ChevronRightIcon className='h-12 w-12 stroke-btn' />
                    </button>
                  ) : (
                    <div></div>
                  )}
                </div>
                <div className='p-4'>
                  <div className='text-[1.8rem] font-semibold grid grid-cols-7 [&>div]:text-center [&>div]:px-3'>
                    <div>Poniedziałek</div>
                    <div>Wtorek</div>
                    <div>Środa</div>
                    <div>Czwartek</div>
                    <div>Piątek</div>
                    <div>Sobota</div>
                    <div className='text-[rgb(214,0,0)]'>Niedziela</div>
                  </div>
                  <div className='grid grid-cols-7 [&>div]:text-center [&>div]:px-3 [&>div]:h-32 [&>div]:p-4 [&>div]:flex [&>div]:flex-col [&>div]:text-4xl [&>div]:font-medium [&>div]:cursor-pointer [&>div]:transition-all [&>div]:duration-300 [&>div>span]:text-xl [&>div>span]:font-medium [&>div:hover]:text-white64'>
                    {renderCalendarDates(month)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Calendar
