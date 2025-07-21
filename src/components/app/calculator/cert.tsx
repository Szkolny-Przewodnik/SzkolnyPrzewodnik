import { memo, useRef, useState } from "react"
import Lessons from "@/Enums/lessons"
import EventEmitter from "@/utils/EventEmitter"

const Cert: React.FC<{ name: string; index: number }> = ({ name, index }) => {
  const activeMark = useRef(-1)
  const punktyInput = useRef<HTMLInputElement | null>(null)
  const buttonsContainer = useRef<HTMLDivElement | null>(null)

  const HandleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (punktyInput.current) {
      if (activeMark.current === Number(e.currentTarget.id)) {
        e.currentTarget.classList.remove("mark-active")
        activeMark.current = -1
        punktyInput.current.value = "0"
      } else {
        activeMark.current = Number(e.currentTarget.id)

        switch (e.currentTarget.id) {
          case "2":
            punktyInput.current.value = "2"
            break
          case "3":
            punktyInput.current.value = "8"
            break
          case "4":
            punktyInput.current.value = "14"
            break
          case "5":
            punktyInput.current.value = "17"
            break
          case "6":
            punktyInput.current.value = "18"
            break
        }
        if (buttonsContainer.current)
          buttonsContainer.current.childNodes.forEach(button => {
            if (button instanceof HTMLElement) {
              if (Number(button.id) === activeMark.current) {
                button.classList.add(
                  "border-[rgba(76,161,255,0.719)]",
                  "border-[1px]",
                  "shadow-lg",
                  "shadow-[rgba(76,161,255,0.2)]"
                )
              } else {
                button.classList.remove(
                  "border-[rgba(76,161,255,0.719)]",
                  "border-[1px]",
                  "shadow-lg",
                  "shadow-[rgba(76,161,255,0.2)]"
                )
              }
            }
          })
      }
    }
    EventEmitter.emit("submit")
    return
  }

  return (
    <div className='w-full flex justify-between gap-4'>
      <label htmlFor={"cert" + index} className='text-4xl w-64 font-medium'>
        {name}
      </label>
      <div className='flex gap-16 text-5xl' ref={buttonsContainer}>
        <button
          onClick={HandleClick}
          className='w-12 rounded-xl transition-all duration-300 outline-none hover:text-[#aaa]'
          id='2'>
          2
        </button>
        <button
          onClick={HandleClick}
          className='w-12 rounded-xl transition-all duration-300 outline-none hover:text-[#aaa]'
          id='3'>
          3
        </button>
        <button
          onClick={HandleClick}
          className='w-12 rounded-xl transition-all duration-300 outline-none hover:text-[#aaa]'
          id='4'>
          4
        </button>
        <button
          onClick={HandleClick}
          className='w-12 rounded-xl transition-all duration-300 outline-none hover:text-[#aaa]'
          id='5'>
          5
        </button>
        <button
          onClick={HandleClick}
          className='w-12 rounded-xl transition-all duration-300 outline-none hover:text-[#aaa]'
          id='6'>
          6
        </button>
      </div>

      <input
        id={"cert" + index}
        type='text'
        disabled
        value='0'
        className='bg-white48 w-40 p-1 rounded-xl text-heading text-center outline-none text-3xl points'
        ref={punktyInput}
      />
    </div>
  )
}

export default memo(Cert)
