"use client"
import ContentElement from "@/components/UI/ContentElement/ContentElement"
import Footer from "@/components/UI/footer/footer"
import Topbar from "@/components/UI/navbar/topbar"
import axios from "axios"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import Container from "@/components/UI/Containers/Container"

const ResultPage = () => {
  const [results, setResults] = useState<[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post(
          "/api/v1/schools/search",
          JSON.parse(localStorage.getItem("formData") ?? "{}")
        )
        setResults(response.data)
        localStorage.removeItem("formData")
      } catch (err) {
        console.error(err)
        setError("Nieprawidłowe dane lub brak danych do wyświetlenia.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <Topbar />
      <main>
        <ContentElement
          className='p-20 min-h-[70vh]'
          heading={"Twoje proponowane kierunki"}
          subheading={"Proponowane kierunki"}>
          <div className='mb-20'>
            <p className='text-3xl w-4/6'>
              Oto proponowane kierunki dla Ciebie, które są posortowane według
              twoich preferencji, zaczynając od pierwszego - najbardziej
              preferowanego.
            </p>
          </div>
          {loading ? (
            <p className='text-2xl'>Ładowanie wyników...</p>
          ) : error ? (
            <p className='text-red-500 text-2xl'>{error}</p>
          ) : results.length > 0 ? (
            <Container className='grid grid-cols-1 gap-20 xl:grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1'>
              {results.map((profile: {
                schoolName: string,
                schoolUrl: string,
                schoolPaid: boolean,
                profileName: string,
                profileImg: string,
                profileType: number,
                profileTags: string[],
                profileExtensions: string[],
                profileExtensionsOPT: string[],
                score: number
              }, index: number) => (
                <figure
                  key={index}
                  className={
                    "bg-white rounded-2xl shadow-xl text-left relative flex flex-col "
                  }>
                  <div className='relative w-full h-60 shadow-2xl'>
                    <Image
                      src={profile.profileImg}
                      alt='Obrazek kierunku'
                      fill
                      objectFit='cover'
                      className='rounded-t-2xl opacity-0 transition-opacity duration-700'
                      onLoadingComplete={img =>
                        img.classList.remove("opacity-0")
                      }
                    />
                  </div>

                  <div className='p-6 flex flex-col gap-4 select-none relative'>
                    {index === 0 ? (
                      <>
                        <Image
                          src={"/doradztwo/star.svg"}
                          alt=''
                          width={50}
                          height={50}
                          className='absolute right-4 top-2 size-16 transform translate-x-0 translate-y-0'
                        />
                      </>
                    ) : (
                      ""
                    )}
                    <h3 className='text-2xl font-bold text-gray-800'>
                      {profile.profileName}
                    </h3>
                    <p className='text-lg text-gray-600 h-12'>
                      {profile.schoolName}
                    </p>
                    <p className='text-sm text-gray-600 select-none'>
                      Typ szkoły:{" "}
                      <strong>{numberToProfileType(profile.profileType)}</strong>
                    </p>
                    <p className='text-sm text-gray-600 select-none'>
                      Niepubliczna:{" "}
                      <strong>
                        {profile.schoolPaid
                          ? "Tak"
                          : "Nie"}
                      </strong>
                    </p>
                    <p className='text-sm text-gray-600 select-none'>
                      Rozszerzenia:{" "}
                      <strong>
                        {profile.profileExtensions.length > 0
                          ? profile.profileExtensions
                              .map((el: any) =>
                                el
                              )
                              .join(", ")
                          : "Brak"}
                      </strong>
                    </p>

                    <p className='text-sm text-gray-600 h-10 select-none '>
                      Opcjonalne Rozszerzenia:{" "}
                      <strong>
                        {profile.profileExtensionsOPT && profile.profileExtensionsOPT.length > 0
                          ? profile.profileExtensionsOPT
                              .map((el: any) =>
                                el
                              )
                              .join(", ")
                          : "Brak"}
                      </strong>
                    </p>

                    <div className='flex flex-wrap gap-2 h-12 select-none'>
                      {profile.profileTags.map((tag: string, idx: number) => (
                        <span
                          key={idx}
                          className='bg-gray-200 text-gray-800 text-xs font-medium px-3 h-6 py-1 rounded-full'>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href={
                        profile.schoolUrl
                      }
                      target='_blank'
                      rel='noopener noreferrer'
                      className=' inline-block py-3 px-5 bg-btn text-white text-sm font-semibold rounded-lg transition-all duration-300 hover:scale-105'>
                      Przejdź do strony szkoły
                    </a>
                  </div>
                </figure>
              ))}
            </Container>
          ) : (
            <strong className='text-2xl text-red-800'>
              {results.length === 0 ? "Nie znaleziono wyników pasujących do twoich preferencji." : ""}
            </strong>
          )}
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

export default ResultPage
