import { ReactNode } from "react"

const Container: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`mx-auto max-w-[120rem]  max-lg:max-w-5xl max-xl:max-w-7xl max-2xl:max-w-[96rem] w-full ${className}`}>
      {children}
    </div>
  )
}

export default Container
