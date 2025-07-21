import { Children, useState } from "react"

export default function useToggle(defaultIsOpen: boolean) {
  const [isTrue, setIsToggle] = useState(defaultIsOpen)

  const handleToggle = () => setIsToggle(!isTrue)

  return { isTrue, handleToggle }
}
