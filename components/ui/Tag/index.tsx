import Link from "next/link"
import cn from 'clsx'
import s from './Tag.module.css'

interface TagProps  {
  category: any;
  variant?: 'primary' | 'secondary',
  className?: string;
}

const Tag = ({category , className, variant = 'primary'}: TagProps) => {

  const rootClassName = cn(
    s.tag,
    {
      [s.primary]: variant === 'primary',
    },
    className
  )
  return (
    <div className={rootClassName}>
      <Link href={category?.slug ? `/category/${category?.slug}`: '/'}>{category?.name}</Link>
    </div>
  )
}
export default Tag