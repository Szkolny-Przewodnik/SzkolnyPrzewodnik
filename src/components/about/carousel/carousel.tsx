import {
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline"
import { useState } from "react"
import Image from "next/image"

const CarouselElement: React.FC<{
  data: { h2: string; p: string; img: string; alt: string }[]
}> = ({ data }) => {
  const [visibleRule, setVisibleRule] = useState(0)
  const [currentAnimation, setCurrentAnimation] = useState("")

  const animationRules = () => {
    setCurrentAnimation("slide-exit")
    setTimeout(() => {
      setCurrentAnimation("slide-enter")
      setTimeout(() => {
        setCurrentAnimation("")
      }, 1100)
    }, 600)
  }

  return (
    <div className='w-[50rem] h-64 my-24 mx-auto bg-main50 py-12 px-20 rounded-lg relative flex items-center gap-20 scale-125 shadow-lg'>
      <Image
        src={data[visibleRule].img}
        alt={data[visibleRule].alt}
        width={500}
        height={500}
        className={
          "w-48 h-72 rounded-xl transition-all duration-300 shadow-xl " +
          currentAnimation
        }
      />
      <div className={`p-3 ${currentAnimation}`}>
        <h2 className='text-4xl font-semibold text-white16 mb-3'>
          {data[visibleRule].h2}
        </h2>
        <p className='text-sm font-medium leading-[1.5] text-white64'>
          {data[visibleRule].p}
        </p>
      </div>
      <button
        className='outline-none bg-white border-none h-16 w-16 rounded-full absolute shadow-2xl cursor-pointer flex items-center justify-center left-0 top-[50%] translate-x-[-50%] translate-y-[-50%]'
        onClick={() => {
          if (currentAnimation === "") {
            setTimeout(() => {
              setVisibleRule(
                visibleRule == 0 ? data.length - 1 : visibleRule - 1
              )
            }, 370)

            animationRules()
          }
        }}
        aria-label='Previous'>
        <ChevronLeftIcon className='h-10 w-10 stroke-btn' />
      </button>

      <button
        className='outline-none bg-white border-none h-16 w-16 rounded-full absolute shadow-2xl cursor-pointer flex items-center justify-center right-0 top-[50%] translate-x-[50%] translate-y-[-50%]'
        onClick={() => {
          if (currentAnimation === "") {
            setTimeout(() => {
              setVisibleRule(
                visibleRule == data.length - 1 ? 0 : visibleRule + 1
              )
            }, 370)
            animationRules()
          }
        }}
        aria-label='Next'>
        <ChevronRightIcon className='h-10 w-10 stroke-btn' />
      </button>
      <div className='select-none absolute left-[50%] bottom-0 translate-x-[-50%] translate-y-[32px] flex gap-5'>
        {data.map((_item, index) => (
          <button
            key={index}
            className={`outline-none h-5 w-5 border-[0.2rem] border-btn rounded-full cursor-pointer ${
              visibleRule === index ? "bg-btn" : ""
            }`}
            onClick={() => {
              if (currentAnimation === "") {
                setTimeout(() => {
                  setVisibleRule(index)
                }, 370)
                animationRules()
              }
            }}
            aria-label={`Slide ${index + 1}`}>
            &nbsp;
          </button>
        ))}
      </div>
    </div>
  )
}

export default CarouselElement
