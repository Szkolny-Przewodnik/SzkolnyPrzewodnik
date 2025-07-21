import Footer from "@/components/UI/footer/footer"
import Topbar from "@/components/UI/navbar/topbar"

const Home: React.FC = () => {
  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Ankieta",
          "url": "https://szkolnyprzewodnik.edu.pl/ankieta",
          "description": "Wypełnij krótką ankietę i pomóż nam rozwijać nasz projekt.",
          "mainEntityOfPage": "https://szkolnyprzewodnik.edu.pl/ankieta",
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
          className='text-white5 flex flex-col justify-center items-center w-full h-[90vh] overflow-hidden bg-cover bg-no-repeat bg-center max-sm:h-[50vh] shadow-2xl shadow-[#303c45]'
          style={{
            backgroundImage: `linear-gradient(
      rgba(34, 34, 34, 0.7),
      rgba(34, 34, 34, 0.7)
    ), url(/form.jpg)`,
          }}>
          <div className='mr-4'>
            <div className='p-4 select-none text-center'>
              <h1 className='text-white16 font-black mb-12 text-[5.2rem] leading-[1.05] tracking-[-0.5px] fadeIn'>
                Ankieta
              </h1>
              <p className='text-white16 text-[2rem] font-medium leading-[1.6] mb-8 '>
                Pomóż nam rozwijać nasz projekt wypełniając krótką ankietę.
              </p>
              <a
                href='#'
                target='_blank'
                className='text-2xl font-medium bg-blue-600 text-white5 no-underline inline-block p-4 rounded-xl transition-all duration-short hover:scale-110'>
                <strong>Weź udział w ankiecie</strong>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Home
