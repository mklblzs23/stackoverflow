import { PropsWithChildren } from 'react'

type Props = PropsWithChildren

export default function Navbar(props: Props) {
  const { children } = props

  return <nav className='sticky h-16 grid place-items-center inset-x-0 top-0 z-30 w-full border-b border-nav bg-nav/50 backdrop-blur transition-all text-white px-2.5 md:px-20'>
    {children}
  </nav>
}
