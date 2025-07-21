import { ReactNode } from "react"

const HeroSection: React.FC<{
  src: string
  heading: string
  other?: {
    italic?: string
    text?: string
    href?: string
  }
  className?: string
}> = ({ src, heading, other, className }) => {
  return (
    <section
      className={
        "text-white5 flex flex-col justify-center items-center w-full h-[100vh] overflow-hidden bg-cover bg-no-repeat bg-center max-sm:h-[50vh] " +
        className
      }
      style={{
        backgroundImage: `linear-gradient(
      rgba(34, 34, 34, 0.6),
      rgba(34, 34, 34, 0.6)
    ), url(${src})`,
      }}>
      <div className='mr-4'>
        <div className='w-3/5 p-4 max-sm:w-4/5 select-none'>
          <h1 className='text-white16 text-left font-black mb-12 text-[5.2rem] leading-[1.05] tracking-[-0.5px] fadeIn'>
            {heading}
            <br />
            {other?.italic ? <em>{other.italic}</em> : ""}
          </h1>
          {other?.text ? (
            <p className='w-10/12 text-white16 text-[2rem] font-medium leading-[1.6] mb-8 fadeIn text-pretty'>
              {other.text}
            </p>
          ) : (
            ""
          )}
          {other?.href ? (
            <a
              href={other.href}
              className='text-2xl font-medium bg-btn text-white5 no-underline inline-block py-6 px-10 rounded-xl transition-all duration-short hover:scale-110'>
              <strong>Sprawdź teraz!</strong>
            </a>
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  )
}
export default HeroSection
