import { PropsWithChildren } from 'react'

type Props = PropsWithChildren

export default function Navbar(props: Props) {
  const { children } = props

  return <nav className='sticky h-20 inset-x-0 top-0 z-30 w-full border-b border-nav bg-nav/60 backdrop-blur transition-all text-white'>
    <div className="flex h-20 items-center justify-between border-b border-nav">
      <div className='mx-auto w-full max-w-screen-xl px-2.5 md:px-20'>
        {children}
      </div>
    </div>
  </nav>
}
