import Image from "next/image"
import { ReactNode } from "react"

const ToolElement: React.FC<{
  href: string
  src: string
  alt: string
  icon: ReactNode
  heading: string
  text: string
}> = ({ href, src, alt, icon, heading, text }) => {
  return (
    <figure
      className='cursor-pointer transition-all duration-short  rounded-2xl overflow-hidden flex flex-col justify-self-center w-[35rem] hover:scale-110 shadow-lg'
      role='link'
      onClick={() => (window.location.href = href)}>
      <Image
        src={src}
        alt={alt}
        className='w-full h-80'
        width={500}
        height={500}
      />
      <div className='py-3 px-7 h-60'>
        <h2 className='flex items-center gap-4 text-[2.4rem] font-medium text-heading my-5 mx-0'>
          {icon}
          {heading}
        </h2>
        <p className='text-[1.6rem] text-paragraph mb-5'>{text}</p>
      </div>
    </figure>
  )
}
export default ToolElement
