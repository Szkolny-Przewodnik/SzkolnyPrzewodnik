import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline"

const QuestionElement: React.FC<{
  index: number
  question: string
  answer: string
  visibleAnswer: number
  handleVisible: (number: number) => void
}> = ({ index, question, answer, handleVisible, visibleAnswer }) => {
  return (
    <li
      className='cursor-pointer select-none hover:scale-95'
      onClick={e =>
        visibleAnswer == index ? handleVisible(-1) : handleVisible(index)
      }>
      <div
        className={`z-10 grid grid-cols-[24px,1fr,24px] gap-x-6 gap-y-8 items-center shadow-custom p-7 rounded-t-2xl ${
          visibleAnswer == index ? "" : "rounded-b-2xl"
        }`}>
        <span className='text-[1.3rem] text-[#ced4da] font-medium'>
          {index + 1}
        </span>
        <h2 className='text-[1.5rem] font-medium '>{question}</h2>

        <ChevronRightIcon
          className={`w-6 h-6 scale-[2] stroke-btn ${
            visibleAnswer == index ? "hidden" : "block"
          }`}
        />

        <ChevronDownIcon
          className={`w-6 h-6 scale-[2] stroke-btn ${
            visibleAnswer == index ? "block" : "hidden"
          }`}
        />
      </div>

      <div
        className={`max-h-48 overflow-hidden z-0 shadow-custom rounded-b-2xl ${
          visibleAnswer == index ? "block" : "hidden"
        }`}>
        <p className='py-4 px-20 text-2xl text-pretty leading-[1.6] font-medium h-auto w-full '>
          {answer}
        </p>
      </div>
    </li>
  )
}

export default QuestionElement
