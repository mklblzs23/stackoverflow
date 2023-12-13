import { PropsWithChildren } from 'react'

type Props = PropsWithChildren & {
  className?: string
}

export default function Box(props: Props) {
  const { children, className } = props

  return (
    <div className={`border rounded-md border-border ${className}`}>
      {children}
    </div>
  )
}
