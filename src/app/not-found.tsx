import Topbar from "@/components/UI/navbar/topbar"
import Footer from "@/components/UI/footer/footer"

export default function NotFound() {
  return (
    <>
      <Topbar />
      <div className='text-center text-9xl bg-sectionbg h-[50vh] flex items-center justify-center'>
        <div className='text-white16'>
          <h1>404</h1>
          <p>Nie znaleziono strony</p>
        </div>
      </div>
      <Footer />
    </>
  )
}
