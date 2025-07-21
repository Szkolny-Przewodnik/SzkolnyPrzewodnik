"use client"

import Container from "@/components/UI/Containers/Container"
import Footer from "@/components/UI/footer/footer"
import Topbar from "@/components/UI/navbar/topbar"
import SearchElement from "@/components/UI/search/searchElement"
import { useRouter } from "next/navigation"

export default function Nawigator() {
  const router = useRouter()

  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Nawigator",
          "url": "https://szkolnyprzewodnik.edu.pl/app/nawigator",
          "description": "Odkryj najlepsze szkoły w swoim powiecie i otwórz drzwi do nowych możliwości.",
          "mainEntityOfPage": "https://szkolnyprzewodnik.edu.pl/app/nawigator",
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
        <section
          className='text-white5 flex flex-col justify-center items-center w-full h-[90vh] overflow-hidden bg-cover bg-no-repeat bg-center '
          style={{
            backgroundImage: `linear-gradient(
      rgba(34, 34, 34, 0.6),
      rgba(34, 34, 34, 0.6)
    ), url(/nawigator/baner.jpg)`,
          }}>
          <Container className='flex flex-col items-center justify-center max-sm:flex-col gap-10 '>
            <h1 className='text-white16 font-black mb-12 text-[4.2rem] leading-[1.05] tracking-[-0.5px] fadeIn text-center'>
              Wyszukaj Powiat w którym mieszkasz
            </h1>
            <form className='w-1/2'>
              <SearchElement
                apiUrl='/v1/districts'
                placeholder="Wyszukaj powiat"
                onSelect={function (el: { _id: string; name: string }): void {
                  router.push(`/app/nawigator/${el._id}`)
                }}
              />
            </form>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
