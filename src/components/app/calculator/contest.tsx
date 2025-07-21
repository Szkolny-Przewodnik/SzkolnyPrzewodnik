import { memo, useRef, useState } from "react"
import EventEmitter from "@/utils/EventEmitter"

const Contest: React.FC<{
  title: string
  indexContest: number
  inputs: { name: string; points: number }[]
}> = ({ title, inputs, indexContest }) => {
  const [selectedOption, setSelectedOption] = useState<number>(-1)
  EventEmitter.on("toggleContest", () => setSelectedOption(-1))

  const handleRadioChange = (value: number) => {
    if (selectedOption === value) {
      setSelectedOption(-1)
      EventEmitter.emit("konkurs", indexContest + 1, 0)
    } else {
      setSelectedOption(value)
      EventEmitter.emit("konkurs", indexContest + 1, inputs[value].points)
    }
  }

  return (
    <div className='text-center'>
      <hr></hr>
      <h1 className='text-[2.6rem] my-5'>{title}</h1>
      <div className='text-2xl'>
        {inputs.map((input, index) => (
          <div className='mb-7 flex flex-row' key={index}>
            <input
              type='checkbox'
              id={"contestInput" + String(index)}
              className='relative text-2xl w-6 h-6 outline-none transition-all duration-300 appearance-none flex content-center justify-center border-[0.3rem] border-btn rounded-full checked:bg-white16 mx-4'
              name={"contest" + indexContest}
              checked={selectedOption === index ? true : false}
              onChange={() => handleRadioChange(index)}
            />
            <label htmlFor={"contestInput" + String(index)}>{input.name}</label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(Contest)
