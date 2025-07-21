import { memo, useRef, useState } from "react"
import Lessons from "@/Enums/lessons"
import EventEmitter from "@/utils/EventEmitter"

const Exam: React.FC<{ index: number; name: string; id: string }> = ({
  index,
  name,
  id,
}) => {
  const [zwolniony, setZwolniony] = useState(false)

  const punktyInput = useRef<HTMLInputElement | null>(null)
  const wynikInput = useRef<HTMLInputElement | null>(null)

  const wynikHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.currentTarget.value) > 100) e.currentTarget.value = "100"

    if (e.currentTarget.value.startsWith("-") || e.currentTarget.value === "-")
      e.currentTarget.value = "0"

    if (zwolniony) {
      if (Number(e.currentTarget.value) > 6) e.currentTarget.value = "6"

      if (
        e.currentTarget.value.startsWith("-") ||
        e.currentTarget.value === "-"
      )
        e.currentTarget.value = "0"
      if (punktyInput.current) {
        if (id === Lessons.MATMA || id === Lessons.POLSKI) {
          switch (e.currentTarget.value) {
            case "6":
              punktyInput.current.value = "35"
              break
            case "5":
              punktyInput.current.value = "30"
              break
            case "4":
              punktyInput.current.value = "25"
              break
            case "3":
              punktyInput.current.value = "15"
              break
            case "2":
              punktyInput.current.value = "10"
              break
          }
        } else if (id === Lessons.ANG) {
          switch (e.currentTarget.value) {
            case "6":
              punktyInput.current.value = "30"
              break
            case "5":
              punktyInput.current.value = "25"
              break
            case "4":
              punktyInput.current.value = "20"
              break
            case "3":
              punktyInput.current.value = "10"
              break
            case "2":
              punktyInput.current.value = "5"
              break
          }
        }
      }
    } else {
      if (id === Lessons.MATMA || id === Lessons.POLSKI) {
        przeliczPunkty(0.35)
      } else if (id === Lessons.ANG) {
        przeliczPunkty(0.3)
      }
    }
    function przeliczPunkty(liczba: number) {
      if (punktyInput.current) {
        if (!Number(e.currentTarget.value)) {
          return (punktyInput.current.value = "0")
        }

        punktyInput.current.value = String(
          Math.round(Number(e.currentTarget.value) * liczba)
        )
        return
      }
    }
    EventEmitter.emit("submit")
  }

  const zwolnionyHandler = () => {
    if (wynikInput.current && punktyInput.current) {
      wynikInput.current.value = ""
      punktyInput.current.value = ""
    }
    EventEmitter.emit("submit")

    setZwolniony(!zwolniony)
  }

  return (
    <div className='w-full flex justify-between gap-4'>
      <label htmlFor={id} className='w-2/4 text-4xl font-medium'>
        {name}
      </label>
      <div className='flex items-center gap-4 text-[1.6rem]'>
        <input
          className='relative text-2xl w-6 h-6 outline-none transition-all duration-300 appearance-none flex content-center justify-center border-[0.3rem] border-btn rounded-full checked:bg-white16'
          id={"zwolniony-" + index + 1}
          type='checkbox'
          onChange={zwolnionyHandler}
        />
        <label htmlFor={"zwolniony-" + index + 1}>zwolniony z egzaminu</label>
      </div>
      <input
        type='number'
        id={id}
        ref={wynikInput}
        className='bg-white48 w-40 p-2 rounded-xl text-heading text-center outline-none text-2xl'
        placeholder={zwolniony ? "Ocena" : "Wynik (%)"}
        onChange={wynikHandler}
      />
      <input
        id={id}
        type='text'
        disabled
        ref={punktyInput}
        value='0'
        className='bg-white48 w-40 p-1 rounded-xl text-heading text-center outline-none text-3xl points'
      />
    </div>
  )
}

export default memo(Exam)
