import { memo, useRef } from "react"
import EventEmitter from "@/utils/EventEmitter"

const Other: React.FC<{
  name: string
  desc: string
  points: string
}> = ({ name, desc, points }) => {
  const wynikSwiadectwo = useRef<HTMLInputElement | null>(null)
  return (
    <div className='container rounded-[40px] w-full px-28 py-20 bg-sectionbg text-white16 mb-28'>
      <h1 className='text-center text-[4.6rem] font-semibold'>{name}</h1>
      <hr></hr>
      <form className='flex justify-between mt-8'>
        <div className='flex flex-row items-center gap-6'>
          <input
            className='relative text-2xl w-6 h-6 outline-none transition-all duration-300 appearance-none flex content-center justify-center border-[0.3rem] border-btn rounded-full checked:bg-white16'
            id={"other" + points}
            type='checkbox'
            onChange={e => {
              if (wynikSwiadectwo.current) {
                const wynik = e.currentTarget.checked ? points : "0"
                wynikSwiadectwo.current.value = wynik
                EventEmitter.emit("submit")
              }
            }}
          />
          <label
            htmlFor={"other" + points}
            className='w-2/4 text-4xl font-medium'>
            {desc}
          </label>
        </div>
        <input
          type='text'
          disabled
          value='0'
          className='bg-white48 w-40 p-2 rounded-xl text-heading text-center outline-none text-3xl points'
          ref={wynikSwiadectwo}
        />
      </form>
    </div>
  )
}

export default memo(Other)
