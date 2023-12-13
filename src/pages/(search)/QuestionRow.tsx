import { Link } from 'react-router-dom'
import { dateTimeUtils } from '../../utils'
import parse from 'html-react-parser'

type Props = {
  votes: number
  answers: number
  views: number
  title: string
  content: string
  tags: string[]
  name: string
  asked: number
  date: number
  profilePicture: string
  userId: number
}

export default function QuestionRow(props: Props) {
  const { votes, answers, views, title, content, tags, name, asked, date, profilePicture, userId } = props
  const formattedDate = dateTimeUtils.timestampToFormattedDateTime(date)

  return <div className='w-full px-2.5 py-1.5 md:px-20 md:py-10 border border-border flex gap-10'>
    <div className='flex flex-col gap-2 text-right'>
      <span className='whitespace-nowrap'>{votes} votes</span>
      <span className='text-answerTag border border-answerTag rounded-md p-1 whitespace-nowrap'>{answers} answers</span>
      <span className='text-viewsTag whitespace-nowrap'>{views} views</span>
    </div>
    <div className='flex flex-col gap-1 w-full col-span-6'>
      <h2 className='text-rowTitle font-bold text-xl'>{title && parse(title)}</h2>
      <div className='line-clamp-2 w-full overflow-hidden'>
        {content && parse(content)}
      </div>
      <div className='flex flex-wrap'>
        {tags?.map(tag => (
          <span key={tag} className='bg-tag px-2 py-1 mt-2 mr-4 rounded-md whitespace-nowrap'>{tag}</span>
        ))}
        <div className='flex gap-2 ml-auto items-center mt-2'>
          <img src={profilePicture} alt='Description of the image' className='w-6 h-6'/>
          <Link to={`/user/${userId}`} className='text-rowTitle'>{name}</Link>
          <span>{asked} asked</span>
          <span className='font-extralight'>{formattedDate}</span>
        </div>
      </div>
    </div>
  </div>
}
