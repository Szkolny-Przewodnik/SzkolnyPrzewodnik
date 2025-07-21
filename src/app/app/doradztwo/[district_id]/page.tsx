import FormDoradztwoComponent from "@/components/app/doradztwo/form"
import Districts from "@/lib/models/districts"
import Topbar from "@/components/UI/navbar/topbar"
import Footer from "@/components/UI/footer/footer"
import { notFound } from "next/navigation"
import connect from "@/lib/database"
import ContentElement from "@/components/UI/ContentElement/ContentElement"
import Image from "next/image"
import Container from "@/components/UI/Containers/Container"

export default async function DoradztwoDistrict({
  params,
}: Readonly<{
  params: { district_id: string }
}>) {
  await connect()

  const data = await Districts.findOne({ _id: params.district_id }, { _id: 1, name: 1, banner: 1, emblem: 1, tags: 1, extensions: 1, beta: 1 })

  if (!data) {
    return notFound()
  }

  return (
    <>
      <Topbar />
      <section
        className='text-white5 flex flex-col justify-center items-center w-full h-[100vh] overflow-hidden bg-cover bg-no-repeat bg-center max-sm:h-[50vh] relative'
        style={{
          backgroundImage: `linear-gradient(
rgba(34, 34, 34, 0.6),
rgba(34, 34, 34, 0.6)
), url(${data.banner})`,
        }}>
        <div className='flex items-center justify-center max-sm:flex-col max-sm:items-start gap-10'>
          <div className='w-2/5 p-4 max-sm:w-3/5'>
            <h1 className='text-white16 text-left font-black mb-12 text-[4.2rem] leading-[1.05] tracking-[-0.5px] fadeIn'>
              Powiat {data.name},
              <br />
              <em>Znajdźmy dla ciebie idealny kierunek!</em>
            </h1>
          </div>
          <FormDoradztwoComponent
            district_id={data._id}
            tags={data.tags}
            extensions={data.extensions}
          />
        </div>
        <span className='absolute left-0 bottom-0 text-[0.4rem] select-none text-gray-400'>
          Niektóre zdjęcia na tej stronie mogą pochodzić z stron powiatów lub
          powiązanymi stronami.
        </span>
        {data.beta ? (
            <div className='absolute bottom-5 left-5 bg-red-500 text-white text-2xl font-bold py-2 px-8 rounded-xl'>
              Beta
            </div>
          ) : ""}
      </section>
      <section className='w-full h-[50rem] p-5 relative z-10 shadow-2xl flex items-center  bg-gradient-to-br from-main to-btn'>
        <Container className='flex items-center justify-between'>
          <div>
            <h2 className='text-4xl font-bold text-white16 mb-4'>
              Więcej informacji o powiecie
              <br /> znajdziesz w nawigatorze!
            </h2>
            <a
              href={`/app/nawigator/${params.district_id}`}
              className='text-3xl font-semibold text-white5 bg-btn no-underline inline-block px-3 py-4 rounded-3xl transition-all hover:scale-110 '>
              Przejdź do nawigatora
            </a>
          </div>
          <div className='flex gap-6'>
            {data.emblem.map((el: string, index: number) => (
              <Image
                key={index}
                src={el}
                alt='Godło'
                className='w-80 max-md:w-60'
                width={300}
                height={300}
              />
            ))}
          </div>
        </Container>
      </section>
      <ContentElement
        className='bg-sectionbg p-20'
        childrenClassName='grid grid-cols-[2fr,1fr] gap-20'
        heading='Zostań Ambasadorem swojego powiatu!'
        subheading='Pomóż zebrać dane o szkołach'
        isWhite
        id='ambassador'>
        <Container className='w-1/2'>
          <div className='text-white16'>
            <h3 className='text-3xl mb-4'>
              Chcesz mieć wpływ na rozwój edukacji w Twojej okolicy?
            </h3>
            <p className='text-xl mb-6'>
              Zostań Ambasadorem swojego powiatu i pomóż zebrać najważniejsze
              informacje o szkołach w Twojej okolicy! Dzięki Tobie, ósmoklasiści
              będą mogli podjąć świadome decyzje dotyczące swojej edukacyjnej
              przyszłości. Jako Ambasador, nie tylko wspierasz innych, ale
              również zdobywasz cenne doświadczenie, które wyróżni Cię na rynku
              pracy!
            </p>
          </div>

          <div className='text-white16 text-2xl'>
            <h3 className='text-3xl mb-4'>Jak możesz pomóc?</h3>
            <ul className='list-disc pl-5 text-xl'>
              <li className='mb-2'>
                Zbieraj i aktualizuj dane o szkołach średnich w Twoim powiecie.
              </li>
              <li className='mb-2'>
                Uzupełniaj informacje o oferowanych kierunkach i wynikach matur.
              </li>
              <li className='mb-2'>
                Pomóż stworzyć rzetelne rankingi szkół na podstawie zebranych
                danych.
              </li>
            </ul>
          </div>

          <div className='mt-8 text-white16'>
            <h3 className='text-3xl mb-4'>
              Dlaczego warto zostać Ambasadorem?
            </h3>
            <ul className='list-disc pl-5 text-xl'>
              <li className='mb-2'>
                Zdobędziesz unikalne doświadczenie w pracy z danymi i współpracy
                przy projektach edukacyjnych.
              </li>
              <li className='mb-2'>
                Wpływasz na przyszłość młodszych uczniów, pomagając im w wyborze
                najlepszej szkoły.
              </li>
            </ul>
          </div>

          <div className='mt-24 text-center'>
            <a
              className='bg-btn text-white5 py-4 px-8 rounded-xl text-2xl font-semibold transition-all hover:scale-110'
              href='/contact'
              target='_blank'>
              Dołącz do nas!
            </a>
          </div>
        </Container>

        <div className='rounded-xl justify-self-end'>
          <Image
            src='/doradztwo/ambasador.jpg'
            alt='Ambasador'
            width={500}
            height={1167}
            className='rounded-xl'
          />
        </div>
      </ContentElement>
      <Footer />
    </>
  )
}
