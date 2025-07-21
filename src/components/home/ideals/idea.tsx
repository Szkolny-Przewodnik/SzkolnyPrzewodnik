import Image from "next/image"
import { ReactNode } from "react"

const IdeaElement: React.FC<{
  src: string
  alt: string
  icon: ReactNode
  heading: string
  text: string
  reverse?: boolean
  isBlack?: boolean
}> = ({ src, alt, icon, heading, text, reverse = false, isBlack = false }) => {
  const textBox = (
    <div>
      <h2
        className={`flex items-center gap-5 text-5xl font-semibold tracking-[1px] mb-5 ${
          isBlack ? "text-[#111]" : "text-white16"
        }`}>
        {icon}
        {heading}
      </h2>
      <p
        className={`text-3xl font-medium  leading-relaxed ${
          isBlack ? "text-[#333]" : "text-white48"
        }`}>
        {text}
      </p>
    </div>
  )

  const imgBox = (
    <div className=' rounded-[20px] my-0 mx-auto overflow-hidden scale-90'>
      <Image
        className='w-full scale-125'
        src={src}
        alt={alt}
        width={500}
        height={500}
      />
    </div>
  )

  return reverse ? (
    <>
      {imgBox}
      {textBox}
    </>
  ) : (
    <>
      {textBox}
      {imgBox}
    </>
  )
}
export default IdeaElement
