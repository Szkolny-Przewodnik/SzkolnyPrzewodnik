"use client"
import IdeaElement from "@/components/home/ideals/idea"
import ContentElement from "@/components/UI/ContentElement/ContentElement"
import Footer from "@/components/UI/footer/footer"
import Topbar from "@/components/UI/navbar/topbar"

import Container from "@/components/UI/Containers/Container"
import SearchElement from "@/components/UI/search/searchElement"
import { useRouter } from "next/navigation"

const Doradztwo: React.FC = () => {
  const router = useRouter()
  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Doradztwo",
          "url": "https://szkolnyprzewodnik.edu.pl/app/doradztwo",
          "description": "Wybierz za pomocą naszego narzędzia szkołę, która do ciebie pasuje.",
          "mainEntityOfPage": "https://szkolnyprzewodnik.edu.pl/app/doradztwo",
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
          className='text-white5 flex flex-col justify-center items-center w-full h-[100vh] mb-16 overflow-hidden bg-cover bg-no-repeat bg-center max-sm:h-[50vh] '
          style={{
            backgroundImage: `linear-gradient(
      rgba(34, 34, 34, 0.6),
      rgba(34, 34, 34, 0.6)
    ), url(/doradztwo/brama.jpg)`,
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
                  router.push(`/app/doradztwo/${el._id}`)
                }}
              />
            </form>
          </Container>
        </section>
        <ContentElement
          className='p-20'
          heading={"W jaki sposób działa nasz program?"}
          subheading={"Jak to działa?"}
          childrenClassName='container grid grid-cols-2 justify-center gap-32 items-center'>
          <IdeaElement
            src={"/doradztwo/szkolyniepubliczne-wybór.jpg"}
            alt={"Wybór yes or no"}
            icon={<span className='text-blue-700'>1.</span>}
            heading={"Zdecyduj o rodzaju szkoły"}
            text={
              "Na początku algorytm poprosi Cię o decyzję, czy uwzględniać również szkoły niepubliczne. Twoja odpowiedź pomoże nam precyzyjnie dobrać rekomendowane kierunki, aby jak najlepiej odpowiadały Twoim oczekiwaniom."
            }
            isBlack
          />
          <IdeaElement
            src={"/doradztwo/typ-szkoly.jpg"}
            alt={"Człowiek zastanawiający się nad drogą"}
            icon={<span className='text-blue-700'>2.</span>}
            heading={"Wybierz preferowany typ szkoły"}
            text={
              "Na tym etapie określasz, czy wolisz liceum, technikum, czy szkołę branżową I stopnia. Algorytm zaproponuje kierunki, które najlepiej odpowiadają Twoim preferencjom."
            }
            isBlack
            reverse
          />
          <IdeaElement
            src={"/doradztwo/zainteresowania.jpg"}
            alt={""}
            icon={<span className='text-blue-700'>3.</span>}
            heading={"Wybierz swoje zainteresowania"}
            text={
              "Następnie wybierzesz swoje zainteresowania, czy wolisz przedmioty ścisłe, humanistyczne, artystyczne, czy może techniczne? Na tej podstawie zawęzimy Twoje preferencje zawodowe do najbardziej odpowiednich profili szkół."
            }
            isBlack
          />
          <IdeaElement
            src={"/doradztwo/rozszerzenia.jpg"}
            alt={"Człowiek z książką"}
            icon={<span className='text-blue-700'>4.</span>}
            heading={"Wskaż przedmioty, które chcesz rozszerzać"}
            text={
              "W kolejnym kroku wybierzesz przedmioty, które chcesz rozszerzać, np. matematyka, biologia, historia. Nasz algorytm dobierze szkoły, które oferują te rozszerzenia i najlepiej pasują do Twoich ambicji."
            }
            isBlack
            reverse
          />
          <IdeaElement
            src={"/doradztwo/rekomendacja.jpg"}
            alt={"Człowiek otwierający wrota"}
            icon={<span className='text-blue-700'>5.</span>}
            heading={"Otrzymaj rekomendacje kierunków"}
            text={
              "Na podstawie wybranych preferencji, algorytm przedstawi Ci listę najbardziej dopasowanych profili i kierunków, co pozwoli Ci łatwo znaleźć szkołę, która najlepiej spełnia Twoje oczekiwania."
            }
            isBlack
          />
        </ContentElement>
      </main>
      <Footer />
    </>
  )
}

export default Doradztwo
