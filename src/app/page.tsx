"use client"
import Footer from "@/components/UI/footer/footer"
import Topbar from "@/components/UI/navbar/topbar"
import {
  AcademicCapIcon,
  BoltIcon,
  HandRaisedIcon,
} from "@heroicons/react/24/outline"
import { CalendarIcon } from "@heroicons/react/24/outline"
import { StarIcon } from "@heroicons/react/24/outline"
import React, { useState } from "react"

import faqData from "@/content/faq.json" assert { type: "json" }
import { CalculatorIcon } from "@heroicons/react/24/outline"
import ContentElement from "@/components/UI/ContentElement/ContentElement"
import ToolElement from "@/components/home/tools/tool"
import IdeaElement from "@/components/home/ideals/idea"
import HeroSection from "@/components/hero"
import QuestionElement from "@/components/home/faq/question"
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline"

const Home: React.FC = () => {
  const [visibleAnswers, setVisibleAnswers] = useState(-1)

  const handleVisible = (number: number) => {
    setVisibleAnswers(number)
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Szkolny Przewodnik",
            "url": "https://szkolnyprzewodnik.edu.pl",
            "description": "Szkolny Przewodnik to Twoje wsparcie i doradztwo w wyborze kariery. Znajdziesz tutaj inspiracje, porady i narzędzia dopasowane do Twoich potrzeb!",
            "sameAs": [
              "https://www.facebook.com/szkolnyprzewodnik",
              "https://www.instagram.com/szkolnyprzewodnik",
              "https://www.tiktok.com/@szkolnyprzewodnik",
              "https://www.youtube.com/@SzkolnyPrzewodnik"
            ],
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
            "hasPart": [
              { "@type": "WebPage", "url": "https://szkolnyprzewodnik.edu.pl/about", "name": "O nas" },
              { "@type": "WebPage", "url": "https://szkolnyprzewodnik.edu.pl/kalkulator", "name": "Kalkulator" },
              { "@type": "WebPage", "url": "https://szkolnyprzewodnik.edu.pl/doradztwo", "name": "Doradztwo" },
              { "@type": "WebPage", "url": "https://szkolnyprzewodnik.edu.pl/nawigator", "name": "Nawigator" },
              { "@type": "WebPage", "url": "https://szkolnyprzewodnik.edu.pl/kalendarz", "name": "Kalendarz" },
              { "@type": "WebPage", "url": "https://szkolnyprzewodnik.edu.pl/ankieta", "name": "Ankieta" },
              { "@type": "WebPage", "url": "https://szkolnyprzewodnik.edu.pl/contact", "name": "Kontakt" }
            ]
          })
        }}
  />
      <Topbar />
      <main>
        <HeroSection
          src='/home/baner.webp'
          heading='SzkolnyPrzewodnik,'
          other={{
            italic: "Edukacyjna przyszłość\nzaczyna się tutaj!",
            text: "Szkolny Przewodnik to platforma edukacyjna stworzona z myślą o uczniach szkół podstawowych i ich rodzicach.",
            href: "#functions",
          }}
          className='mb-16 whitespace-pre-line sm:whitespace-normal'
        />

        {/* <section id='partners'></section> */}

        <ContentElement
          className='p-20 m-0 text-center mb-40'
          heading={"Skorzystaj z naszych narzędzi w życiu codziennym"}
          subheading={"Oferowane funkcje"}
          childrenClassName='grid grid-cols-3 max-2xl:grid-cols-2 justify-stretch text-left mx-0 my-auto gap-40'
          id='functions'>
          <ToolElement
            href='/app/doradztwo'
            src='/home/functions/school-img.jpg'
            alt='School Icon'
            icon={<AcademicCapIcon className='size-8' />}
            heading='Doradztwo'
            text='Wybierz za pomocą naszego narzędzia szkołę, która do ciebie pasuje.'
          />
          <ToolElement
            href='/app/nawigator'
            src='/home/functions/nawigator-img.jpg'
            alt='Notebook Icon'
            icon={<MagnifyingGlassCircleIcon className='size-8' />}
            heading='Nawigator'
            text='Odkryj najlepsze szkoły w swoim powiecie i otwórz drzwi do nowych możliwości.'
          />
          <ToolElement
            href='/app/kalendarz'
            src='/home/functions/calendar-img.jpg'
            alt='Calendar Icon'
            icon={<CalendarIcon className='size-8' />}
            heading='Kalendarz'
            text='Sprawdź dni wolne i zaplanuj swój rok szkolny perfekcyjnie już teraz.'
          />
          <ToolElement
            href='#function'
            src='/home/functions/question-img.jpg'
            alt='Question mark Icon'
            icon={<HandRaisedIcon className='size-8' />}
            heading='Wkrótce...'
            text='Wkrótce dodamy nowe funkcjonalności.'
          />
          <ToolElement
            href='/app/kalkulator'
            src='/home/functions/calculator-img.jpg'
            alt='Calculator Icon'
            icon={<CalculatorIcon className='size-8' />}
            heading='Kalkulator'
            text='Za pomocą naszego kalkulatora obliczysz swoje punkty do szkoły średniej.'
          />
          <ToolElement
            href='#function'
            src='/home/functions/question-img.jpg'
            alt='Question mark Icon'
            icon={<HandRaisedIcon className='size-8' />}
            heading='Wkrótce...'
            text='Wkrótce dodamy nowe funkcjonalności.'
          />
        </ContentElement>

        <ContentElement
          className='p-20 m-0 mb-20 bg-sectionbg'
          heading={"Chcemy pomóc użytkownikowi takiemu jak ty!"}
          subheading={"Nasze cele"}
          childrenClassName='container grid grid-cols-2 justify-center gap-32 items-center'
          isWhite={true}>
          <IdeaElement
            src={"/home/ideals/choice.jpg"}
            alt={"Wybór tabletek biała czy żółta?"}
            icon={<BoltIcon className='size-10 text-icons' />}
            heading={"Szybki i dobry wybór"}
            text={
              "Narzędzie do wybierania szkoły znajdzie w twoim Powiecie szkołę, która według twoich wymagań, zainteresowań oraz umiejętnośći pasuje idealnie do Ciebie!"
            }
          />
          <IdeaElement
            src={"/home/ideals/nawigation.jpg"}
            alt={"Torowisko"}
            icon={<MagnifyingGlassCircleIcon className='size-10 text-icons' />}
            heading={"Prosta nawigacja"}
            text={
              "Nasze narzędzia szybko nawigują cię na nowe ścieżki Twojego życia."
            }
            reverse
          />

          <IdeaElement
            src={"/home/ideals/light.jpg"}
            alt={"Przyszłość"}
            icon={<StarIcon className='size-10 text-icons' />}
            heading={"Świetlana Przyszłość"}
            text={
              "Czy to diament? Nie! To twoja przyszłość oszlifowana jak brylant przy naszej pomocy."
            }
          />
        </ContentElement>

        <ContentElement
          heading='Masz jakieś pytania?'
          subheading='Sekcja FAQ'
          className='p-20 m-0 mb-40'
          childrenClassName='grid md:grid-cols-1 lg:grid-cols-2 items-start gap-14'>
          <div className='relative z-10 min-h-[50rem] w-full rounded-xl p-5 flex flex-col items-center shadow-custom'>
            <ul className='flex flex-col gap-7 transition-all duration-short'>
              {faqData.map((item, index) => (
                <QuestionElement
                  index={index}
                  question={item.question}
                  answer={item.answer}
                  visibleAnswer={visibleAnswers}
                  handleVisible={handleVisible}
                  key={index}
                />
              ))}
            </ul>
          </div>

          <div className='w-full h-[50rem] p-5 relative z-10 shadow-2xl rounded-xl flex flex-col items-center justify-center bg-gradient-to-br from-main to-btn'>
            <h2 className='text-4xl font-bold text-white16 mb-4'>
              Masz jeszcze jakieś pytania?
            </h2>
            <p className='text-3xl text-white48 text-center mb-8'>
              Wypełnij formularz kontaktowy, a udzielimy ci odpowiedzi.
            </p>
            <a
              href='/contact'
              className='text-3xl font-semibold text-white5 bg-btn no-underline inline-block px-3 py-4 rounded-3xl transition-all hover:scale-110 '>
              Formularz
            </a>
          </div>
        </ContentElement>
      </main>
      <Footer />
    </>
  )
}

export default Home
