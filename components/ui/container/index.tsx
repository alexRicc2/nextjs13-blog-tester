import { FC, Ref, forwardRef } from 'react'
import s from './Container.module.css'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>
}

const Container: FC<ContainerProps> = forwardRef((props, ref: Ref<HTMLDivElement>) => {
  const {
    className,
    children
  } = props

  return (
    <div className={`${s.container} ${className}`} ref={ref}>
        {children}
    </div>
  )
})
Container.displayName = 'Container'
export default Container