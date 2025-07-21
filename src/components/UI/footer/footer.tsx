import Image from "next/image"

import Link from "next/link"
import Container from "../Containers/Container"

const Footer: React.FC = () => {
  return (
    <footer className='mt-auto pt-44 pb-14 px-0 bg-main'>
      <Container className='grid grid-cols-4 gap-y-10 '>
        <div className='flex flex-col items-center'>
          <Link href='#' className='w-16 h-16 mb-12 '>
            <Image
              alt='SzkolnyPrzewodnik logo'
              className='select-none'
              src='/Logo.png'
              width={100}
              height={100}
            />
          </Link>

          <ul className='text-white16 list-none flex gap-5 items-center justify-center w-1/2 select-none'>
            <li>
              <Link
                className='no-underline text-2xl text-[#bbb] transition-all duration-300 hover:text-[#555s]'
                href='#'>
                <Image
                  className='select-none size-7 '
                  src='/social/instagram-icon.png'
                  alt='instagram'
                  width={100}
                  height={100}
                />
              </Link>
            </li>
            <li>
              <Link
                className='no-underline text-2xl text-[#bbb] transition-all duration-300 hover:text-[#555s]'
                href='#'>
                <Image
                  className='select-none size-7'
                  src='/social/tiktok-icon.png'
                  alt='tiktok'
                  width={100}
                  height={100}
                />
              </Link>
            </li>
            <li>
              <Link
                className='no-underline text-2xl text-[#bbb] transition-all duration-300 hover:text-[#555s]'
                href='#'>
                <Image
                  className='select-none size-7'
                  src='/social/discord-icon.png'
                  alt='discord'
                  width={100}
                  height={100}
                />
              </Link>
            </li>
            <li>
              <Link
                className='no-underline text-2xl text-[#bbb] transition-all duration-300 hover:text-[#555s]'
                href='#'>
                <Image
                  className='select-none size-7'
                  src='/social/facebook-icon.png'
                  alt='facebook'
                  width={100}
                  height={100}
                />
              </Link>
            </li>
            <li>
              <Link
                className='no-underline text-2xl text-[#bbb] transition-all duration-300 hover:text-[#555s]'
                href='#'>
                <Image
                  className='select-none size-7'
                  src='/social/youtube-icon.png'
                  alt='youtube'
                  width={100}
                  height={100}
                />
              </Link>
            </li>
          </ul>
          <a href='https://zwolnienizteorii.pl'>
            <Image
              className='my-10 hover:cursor-pointer select-none w-full max-w-xs md:max-w-sm lg:max-w-md'
              role='link'
              src={"/zwzt.png"}
              alt={"Realizowane w ramach zwzt"}
              width={250}
              height={75}
            />
          </a>
        </div>

        <nav className='select-none text-center'>
          <p className='text-3xl font-medium mb-16 text-white16'>
            Linki Nawigacyjne
          </p>
          <ul className='list-none flex flex-col gap-6'>
            <li>
              <Link
                className='no-underline text-2xl text-[#bbb] transition-all duration-300 hover:text-[#555s]'
                href='/'>
                Strona Główna
              </Link>
            </li>
            <li>
              <Link
                className='no-underline text-2xl text-[#bbb] transition-all duration-300 hover:text-[#555s]'
                href='/about'>
                O nas
              </Link>
            </li>
            <li>
              <Link
                className='no-underline text-2xl text-[#bbb] transition-all duration-300 hover:text-[#555s]'
                href='/ankieta'>
                Ankieta
              </Link>
            </li>
            <li>
              <Link
                className='no-underline text-2xl text-[#bbb] transition-all duration-300 hover:text-[#555s]'
                href='/contact'>
                Kontakt
              </Link>
            </li>
          </ul>
        </nav>

        <nav className='select-none text-center'>
          <p className='text-3xl font-medium mb-16 text-white16'>
            Nasze Narzędzia
          </p>
          <ul className='list-none flex flex-col gap-6'>
            <li>
              <Link 
                href="/app/kalkulator" 
                className="no-underline text-2xl text-[#bbb] transition-all duration-300 hover:text-[#555s]"
              >
                Kalkulator
              </Link>
            </li>
            <li>
              <Link 
                href="/app/doradztwo" 
                className="no-underline text-2xl text-[#bbb] transition-all duration-300 hover:text-[#555s]"
              >
                Doradztwo
              </Link>
            </li>
            <li>
              <Link 
                href="/app/nawigator" 
                className="no-underline text-2xl text-[#bbb] transition-all duration-300 hover:text-[#555s]"
              >
                Nawigator
              </Link>
            </li>
            <li>
              <Link 
                href="/app/kalendarz" 
                className="no-underline text-2xl text-[#bbb] transition-all duration-300 hover:text-[#555s]"
              >
                Kalendarz
              </Link>
            </li>
          </ul>
        </nav>

        <nav className='select-none text-center'>
          <p className='text-3xl font-medium mb-16 text-white16'>Dokumenty</p>
          <ul className='list-none flex flex-col gap-6'>
            <li>
              <Link
                className='no-underline text-2xl text-[#bbb] transition-all duration-300 hover:text-[#555s]'
                href='#'>
                Polityka Prywatności
              </Link>
            </li>
            <li>
              <Link
                className='no-underline text-2xl text-[#bbb] transition-all duration-300 hover:text-[#555s]'
                href='#'>
                Polityka Cookies
              </Link>
            </li>
            <li>
              <Link
                className='no-underline text-2xl text-[#bbb] transition-all duration-300 hover:text-[#555s]'
                href='#'>
                Regulamin
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </footer>
  )
}

export default Footer
