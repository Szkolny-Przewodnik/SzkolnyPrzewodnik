import React from "react"
import Image from "next/image"
interface Props {
  url: string
  name: string
  lastname: string
  role: string
  date: string
  className?: string
}

const PersonInfo: React.FC<Props> = ({
  url,
  name,
  lastname,
  role,
  date,
  className,
}) => {
  return (
    <>
      <figure
        className={`my-auto w-[27rem] h-40 flex rounded-full bg-sectionbg shadow-neutral-900 shadow-md leading-[1.4] items-center mx-auto ${className}`}>
        <Image
          className='w-40 rounded-full scale-[0.8] h-40'
          src={url}
          alt='Człowiek'
          width={500}
          height={500}
        />
        <div className='py-4'>
          <h1 className='text-white16 text-2xl mb-1'>
            {name + " " + lastname}
          </h1>
          <strong className='text-white64 leading-[1.4]'>{role}</strong>
          <p className='text-white16 text-lg mb-5'>Dołączył/a {date}</p>
        </div>
      </figure>
    </>
  )
}

export default PersonInfo
