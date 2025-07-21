"use server"
import Footer from "@/components/UI/footer/footer"
import Topbar from "@/components/UI/navbar/topbar"
import connect from "@/lib/database"
import Districts from "@/lib/models/districts"
import Image from "next/image"

import { notFound, useRouter } from "next/navigation"
import DistrictComponent from "@/components/app/Nawigator/DistrictComponent"

export default async function DistrictPage({
  params,
}: {
  params: { district_id: string }
}) {
  await connect()

  const data = await Districts.findOne(
    { _id: params.district_id },
    {
      _id: 1,
      name: 1,
      emblem: 1,
      banner: 1,
      capital: 1,
      voivodeship: 1,
      beta: 1
    }
  )

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
    ), url('${data?.banner}')`,
          }}>
          <span className='absolute left-0 bottom-0 text-[0.4rem] select-none text-gray-400'>
            Niektóre zdjęcia na tej stronie mogą pochodzić z stron powiatów lub
            powiązanymi stronami.
          </span>
          <div className='absolute right-0 bottom-0 text-white py-10 px-20 flex items-center justify-end gap-20'>
            <h1 className='text-6xl shadow-2xl p-4 rounded-xl bg-main50 select-none'>
              Powiat {data?.name}
            </h1>
            <div className='max-w-2/4 flex gap-6'>
              {data.emblem.map((el: string, index: number) => (
                <Image
                  key={index}
                  src={el}
                  alt='Godło'
                  className='w-56 h-auto select-none'
                  width={150}
                  height={150}
                />
              ))}
            </div>
          </div>
        {data.beta ? (
            <div className='absolute bottom-5 left-5 bg-red-500 text-white text-2xl font-bold py-2 px-8 rounded-xl'>
              Beta
            </div>
          ) : ""}
        </section>
        <DistrictComponent
          district_id={params.district_id}
          data={{
            name: data.name,
            capital: data.capital,
            voivodeship: data.voivodeship,
          }}
        />
      </main>
      <Footer />
    </>
  )
}
