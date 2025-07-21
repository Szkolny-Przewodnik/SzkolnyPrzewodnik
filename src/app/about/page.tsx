"use client"
import Footer from "@/components/UI/footer/footer"
import Topbar from "@/components/UI/navbar/topbar"
import Image from "next/image"
import PersonInfo from "@/components/about/PersonInfo"
import CarouselData from "@/content/rules.json" assert { type: "json" }
import persononsData from "@/content/persons.json"
import HeroSection from "@/components/hero"
import ContentElement from "@/components/UI/ContentElement/ContentElement"
import CarouselElement from "@/components/about/carousel/carousel"
import PartnersElement from "@/components/partners"

export default function About() {
  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "O nas",
          "url": "https://szkolnyprzewodnik.edu.pl/about",
          "description": "Dowiedz się więcej o naszym zespole i naszej misji.",
          "mainEntityOfPage": "https://szkolnyprzewodnik.edu.pl/about",
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
      <main>
        <HeroSection
          src={"/about/baner-about.jpg"}
          heading={"Trochę o nas,"}
          other={{ italic: "czyli jak zmieniamy przyszłość edukacji." }}
          className='mb-0'
        />
        <PartnersElement />

        <ContentElement
          className='p-20 m-0 text-center mb-40'
          heading='Nasze zasady i wartości'
          subheading='Czym się kierujemy'>
          <CarouselElement data={CarouselData} />
        </ContentElement>
        <ContentElement
          heading={
            "Jesteśmy młodym, dynamicznie rozwijającym się zespołem, któremu przyświeca jeden cel - niesienie naszej wizji na zmianę w polskim pojmowaniu edukacji"
          }
          className='text-center bg-sectionbg flex flex-col gap-12 mb-36 py-48 px-0'
          subheading={"Nasz wizja"}
          isWhite={true}>
          <div className='overflow-hidden w-full'>
            <Image
              src='/about/zespol.jpg'
              alt='Zespol'
              width={2000}
              height={100}
              className='rounded-[30px] my-0 mx-auto w-auto h-[50rem]'
            />
          </div>
        </ContentElement>
        <ContentElement
          className='p-28 relative'
          heading={
            "Nasz zespół to grupa wyjątkowych profesjonalistów, wyróżniających się pasją i zaangażowaniem"
          }
          subheading={"Nasz Zespół"}>
          <div className='mx-auto container grid grid-cols-3 max-xl:grid-cols-2 justify-stretch gap-14'>
            {persononsData.map((item, index) => (
              <PersonInfo
                key={index}
                url={item.url}
                name={item.name}
                lastname={item.lastname}
                role={item.role}
                date={item.date}
                className='max-xl:last:col-span-2'
              />
            ))}
          </div>
        </ContentElement>
      </main>
      <Footer />
    </>
  )
}
