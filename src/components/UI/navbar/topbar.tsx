"use client"
import { ReactNode, useEffect, useState } from "react"
import Image from "next/image"
import { Pages } from "@/Enums/pages"

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

const Topbar: React.FC = () => {
  const [Page, setPage] = useState(Pages.HOME)

  const [NavOpen, setNavOpen] = useState(false)

  useEffect(() => {
    const currentPath = window.location.pathname
    if (currentPath === "/") {
      setPage(Pages.HOME)
    } else if (currentPath.endsWith(Pages.ABOUT)) {
      setPage(Pages.ABOUT)
    } else if (currentPath.endsWith(Pages.CONTACT)) {
      setPage(Pages.CONTACT)
    } else if (currentPath.endsWith(Pages.ANKIETA)) {
      setPage(Pages.ANKIETA)
    } else {
      setPage(Pages.MORE)
    }
  }, [])

  return (
    <div className='h-[10rem] transition-all duration-100 z-[999]'>
      <header
        className={`mx-auto fixed top-0 flex justify-around max-lg:justify-between items-center py-20 px-20 bg-main transition-all duration-100 text-white5 w-full h-36 ${
          NavOpen ? "nav-open" : ""
        }`}>
        <Link
          href='/'
          className='w-24 flex items-center justify-center select-none'>
          <Image
            src='/Logo.png'
            alt='Logo png'
            width={500}
            height={500}
            className='w-full h-full z-20 '
          />
        </Link>
        <nav className='max-lg:hidden ol-container flex items-center gap-4 '>
          <ol className='gap-10 w-auto mr-5 flex list-none'>
            <ListItem
              text={"Strona Główna"}
              href='/'
              active={Page === Pages.HOME}
            />
            <ListItem
              text={"O nas"}
              href={"/" + Pages.ABOUT}
              active={Page === Pages.ABOUT}
            />

            <ListItem
              text={"Szkolne >"}
              active={Page === Pages.MORE}
              className='group'>
              <ul className='group-hover:opacity-100 opacity-0 fixed top-[116%] left-1/2 -translate-x-1/2 bg-[rgba(40,40,95,0.8)] p-5 rounded-xl border-3 border-[rgb(40,40,95)] shadow-[0_10px_60px_#2c2c55] transition-all duration-300 border-[3px]'>
                {[
                  ["Kalkulator", "/app/kalkulator"],
                  ["Doradztwo", "/app/doradztwo"],
                  ["Nawigator", "/app/nawigator"],
                  ["Kalendarz", "/app/kalendarz"],
                ].map((el, index) => (
                  <li
                    className='relative text-center text-[1.8rem] mt-4 first:mt-0 hover:scale-110 transition-all select-none'
                    key={index}>
                    <a href={el[1]}>{el[0]}</a>
                  </li>
                ))}
              </ul>
            </ListItem>
            <ListItem
              text={"Ankieta"}
              href={"/" + Pages.ANKIETA}
              active={Page === Pages.ANKIETA}
            />
            <ListItem
              text={"Kontakt"}
              href={"/" + Pages.CONTACT}
              active={Page === Pages.CONTACT}
            />
          </ol>
        </nav>

        <button
          className='z-50 hidden max-lg:block outline-none hover:scale-110'
          aria-label={NavOpen ? "Zamknij menu" : "Otwórz menu"}
          onClick={() => {
            setNavOpen(!NavOpen)
          }}>
          <Bars3Icon
            className={`hamburger-icon-menu size-10 max-lg:size-20 ${
              NavOpen ? "hidden" : ""
            }`}
          />
          <XMarkIcon
            className={`hamburger-icon-close size-10 max-lg:size-20 ${
              NavOpen ? "" : "hidden"
            }`}
          />
        </button>
        <div
          className={`bg-[rgba(28,28,60,0.514)] backdrop-blur-md fixed top-0 left-0 w-full overflow-hidden  flex items-center justify-center gap-24 transition-all duration-500 ease-in select-none  ${
            NavOpen
              ? " opacity-100 pointer-events-auto visible translate-y-[0] h-[100vh]"
              : "h-0 opacity-0 pointer-events-none invisible translate-y-[-100%]"
          }`}>
          <div className='flex flex-col items-center justify-center gap-5'>
            <nav className='flex items-center gap-4'>
              <ol className=' gap-9 w-auto mr-5 flex list-none flex-col'>
                <ListItem
                  text={"Strona Główna"}
                  href='/'
                  active={Page === Pages.HOME}
                  className='text-6xl mb-4'
                />
                <ListItem
                  text={"O nas"}
                  href={"/" + Pages.ABOUT}
                  active={Page === Pages.ABOUT}
                  className='text-6xl mb-4'
                />
                <ListItem
                  text={"Ankieta"}
                  href={"/" + Pages.ANKIETA}
                  active={Page === Pages.ANKIETA}
                  className='text-6xl mb-4'
                />
                <ListItem
                  text={"Kontakt"}
                  href={"/" + Pages.CONTACT}
                  active={Page === Pages.CONTACT}
                  className='text-6xl mb-4'
                />
              </ol>
            </nav>
          </div>
          <ul className='bg-[rgb(40,40,95,0.8)] p-8 rounded-2xl border-[rgba(40,40,95)] border-[3px] shadow-lg shadow-black'>
            <li className='text-center transition-all duration-200 select-none text-5xl mb-8 hover:scale-125'>
              <Link href={"/app/kalkulator"}>Kalkulator</Link>
            </li>
            <li className='text-center transition-all duration-200 select-none text-5xl mb-8 hover:scale-125'>
              <Link href={"/app/doradztwo"}>Doradztwo</Link>
            </li>
            <li className='text-center transition-all duration-200 select-none text-5xl mb-8 hover:scale-125'>
              <Link href={"/app/nawigator"}>Nawigator</Link>
            </li>
            <li className='text-center transition-all duration-200 select-none text-5xl hover:scale-125'>
              <Link href={"/app/kalendarz"}>Kalendarz</Link>
            </li>
          </ul>
        </div>
      </header>
    </div>
  )
}
export default Topbar

const ListItem: React.FC<{
  text: string
  active: boolean
  href?: string
  className?: string
  children?: ReactNode
}> = ({ text, href = "/", active, children, className }) => {
  return (
    <li
      className={`mb-1 text-center text-5xl relative font-bold transition-all duration-300 cursor-pointer hover:scale-[1.2] hover:skew-y-[0.5deg] select-none ${
        active
          ? "after:content-[''] after:bg-[#55a3fc66] after:shadow after:shadow-[#55a3fc66] after:w-[90%] after:h-[6px] after:rounded-md after:absolute after:left-2/4 after:bottom-[-5px] after:translate-x-[-50%]"
          : ""
      } ${className}`}>
      {children ? (
        <>
          {text}
          {children}
        </>
      ) : (
        <Link href={href} className='tracking-tighter'>
          {text}
        </Link>
      )}
    </li>
  )
}
