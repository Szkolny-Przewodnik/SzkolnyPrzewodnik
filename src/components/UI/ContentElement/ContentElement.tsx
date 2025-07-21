import { ReactNode } from "react"
import Container from "../Containers/Container"

const ContentElement: React.FC<{
  heading: string
  subheading: string
  className?: string
  children: ReactNode
  childrenClassName?: string
  isWhite?: boolean
  id?: string
}> = ({
  heading,
  subheading,
  className = "",
  children,
  childrenClassName = "",
  isWhite = false,
  id,
}) => {
  const subHeadingColor = isWhite ? "text-altsubheading" : "text-subheading"
  const headingColor = isWhite ? "text-altheading" : "text-heading"
  return (
    <section className={className} id={id}>
      <Container className='mb-28'>
        <span
          className={
            "block text-[1.6rem] font-medium uppercase mb-6 select-none " +
            subHeadingColor
          }>
          {subheading}
        </span>
        <h1
          className={
            "font-bold leading-mini text-7xl mb-14 select-none " + headingColor
          }>
          {heading}
        </h1>
      </Container>
      <Container className={childrenClassName}>{children}</Container>
    </section>
  )
}

export default ContentElement
