import { PostType } from '../../types'
import { isEmpty } from 'lodash'



type Props = {
  postTypes: {
    title: string,
    type: PostType,
  }[]
  onClick: (postType: {
    title: string,
    type: PostType,
  }) => void
  className?: string
}

export default function PostTab(props: Props) {
  const { postTypes, onClick, className } = props

  if(isEmpty(postTypes)) return null

  return <div className={`flex border rounded-md border-border ${className}`}>
    {postTypes.map((postType, index) => (
      <div className='flex' key={postType.title}>
        <button
          key={postType.title}
          onClick={() => onClick(postType)}
          className='text-white text-sm font-light bg-transparent focus:outline-none hover:border-transparent hover:outline-none'
        >
          {postType.title}
        </button>
        {index !== postTypes.length - 1 && <span className='border border-border'></span>}
      </div>
    ))}
  </div>
}
