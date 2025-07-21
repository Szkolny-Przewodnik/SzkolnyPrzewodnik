import Footer from "@/components/UI/footer/footer"
import Topbar from "@/components/UI/navbar/topbar"
import connect from "@/lib/database"
import { notFound } from "next/navigation"
import SchoolSchema from "@/lib/models/school"
import mongoose from "mongoose"
import ContentElement from "@/components/UI/ContentElement/ContentElement"
import Image from "next/image"
const { Schema, model } = mongoose

export default async function SchoolPage({
  params,
}: {
  params: { district_id: string; school_id: string }
}) {
  await connect()

  const Schools =
    mongoose.models[params.district_id] ||
    model(params.district_id, SchoolSchema)

  const data = await Schools.findOne({ _id: params.school_id })

  if (!data) {
    return notFound()
  }

  return (
    <>
      <Topbar />
      <main>
        <section
          className='text-white5 w-full h-[50vh] overflow-hidden bg-cover bg-no-repeat bg-center relative shadow-2xl'
          style={{
            backgroundImage: `linear-gradient(
      rgba(34, 34, 34, 0.5),
      rgba(34, 34, 34, 0.5)
    ), url('${data.img}')`,
          }}>
          <span className='absolute left-0 bottom-0 text-[0.4rem] select-none text-gray-400'>
            Niektóre zdjęcia na tej stronie mogą pochodzić z stron szkół lub
            powiązanymi stronami.
          </span>
          <h1 className='text-2xl shadow-2xl p-4 rounded-xl bg-main50 select-none text-center absolute bottom-10 text-white left-[50%] translate-x-[-50%]'>
            {data?.name}
          </h1>
          {data.paid && (
            <div className='absolute bottom-5 right-5 bg-red-500 text-white text-2xl font-bold py-4 px-12 rounded-xl'>
              Niepubliczna
            </div>
          )}
        </section>

        <a
          className=' bg-btn text-2xl text-white p-4 rounded-xl absolute z-50 translate-y-[-50%] translate-x-[-50%] left-[50%]'
          href={data.url}
          target='_blank'>
          Przejdź na stronę szkoły
        </a>
        <ContentElement
          className='p-20 bg-sectionbg'
          heading={"Informacje o szkole"}
          subheading={"INFORMACJE"}
          isWhite>
          <div className='bg-main50 p-8 rounded-2xl text-white mb-10 shadow-2xl'>
            <h3 className='text-3xl font-semibold mb-2'>
              <strong>Wyniki Egzaminów Maturalnych:</strong> {data.capital}
            </h3>
            <p className='text-2xl'>
              Język Polski:{" "}
              <strong>
                {data.results.polish !== -1
                  ? `${data.results.polish}%`
                  : "Brak danych"}
              </strong>
            </p>
            <p className='text-2xl'>
              Matematyka:{" "}
              <strong>
                {data.results.math !== -1
                  ? `${data.results.math}%`
                  : "Brak danych"}
              </strong>
            </p>
            <p className='text-2xl'>
              Język Angielski:{" "}
              <strong>
                {data.results.aliens !== -1
                  ? `${data.results.aliens}%`
                  : "Brak danych"}
              </strong>
            </p>
          </div>

          <div>
            <h2 className='text-center text-5xl my-10 text-white'>
              Lista Kierunków
            </h2>
            <div className='grid gap-20 grid-cols-2 xl:grid-cols-3'>
              {data.profiles.map((profile: any, index: number) => (
                <figure
                  key={index}
                  className={
                    "bg-main50 rounded-2xl shadow-xl text-left overflow-hidden relative flex flex-col w-[30rem] mx-auto"
                  }>
                  <div className='relative w-full h-60 shadow-2xl'>
                    <Image
                      src={profile.img}
                      alt='Obrazek kierunku'
                      fill
                      className='rounded-t-2xl duration-700'
                    />
                  </div>

                  <div className='p-6 flex flex-col gap-4'>
                    <h3 className='text-2xl font-bold text-white'>
                      {profile.name}
                    </h3>
                    <p className='text-lg text-white16'>
                      Typ szkoły:{" "}
                      <strong>{numberToProfileType(profile.type)}</strong>
                    </p>
                    <p className='text-lg text-white16'>
                      Rozszerzenia:{" "}
                      <strong>
                        {profile.extensions
                          .map((el: any) =>
                            el
                          )
                          .join(", ")}
                      </strong>
                    </p>
                    <p className='text-lg text-white16'>
                      Opcjonalne Rozszerzenia:{" "}
                      <strong>
                        {profile.extensionsOpt.length > 0
                          ? profile.extensionsOpt
                              .map((el: any) =>
                                el
                              )
                              .join(", ")
                          : "Brak"}
                      </strong>
                    </p>

                    <div className='flex flex-wrap gap-2'>
                      {profile.tags.map((tag: string, idx: number) => (
                        <span
                          key={idx}
                          className='bg-btn text-white16 text-sm font-medium px-3 py-1 rounded-full'>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </ContentElement>
      </main>
      <Footer />
    </>
  )
}

function numberToProfileType(num: number): string {
  switch (num) {
    case 1:
      return "Technikum"
    case 2:
      return "Liceum"
    case 3:
      return "Branżowa szkoła I stopnia"
    case 4:
      return "Nie określone"
  }
  return ""
}
