import { useParams } from 'react-router-dom'
import { userService } from '../../services'
import { useQuery } from 'react-query'
import CakeIcon from '@mui/icons-material/Cake'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import { dateTimeUtils } from '../../utils'
import parse from 'html-react-parser'
import Box from '../../components/Box'
import Badges from './Badges'
import Tags from './Tags'
import Posts from './Posts'
import { User } from '../../types'
import Loader from '../../components/Loader'

const UserPage = () => {
  const { userId = '' } = useParams()
  const { data: user, isLoading } = useQuery<User>({
    queryFn: () => userService.getUser(userId),
    queryKey: ['user'],
    enabled: !!userId,
  })
  const formattedDate = user && dateTimeUtils.timestampToFormattedDateTime(user?.creation_date)
  const formattedLastSeenDate = user && dateTimeUtils.getLastAvailable(user?.last_access_date)

  if (isLoading) return <Loader />
  if (!user) return <div className='h-full w-full grid place-items-center'>User not found</div>
  if (user.error_message) return <div className='h-full w-full grid place-items-center'>{user.error_message}</div>

  return <div className='w-full h-full px-2.5 py-1.5 md:px-20 md:py-10'>
    <div className='border border-border p-10 rounded-md'>
      <div className='flex items-center'>
        <img src={user.profile_image} alt='User profile picture' className='w-24 h-24'/>
        <div className='ml-10'>
          <h2 className='text-md font-bold md:text-xl lg:text-2xl'>{user.display_name && parse(user.display_name)}</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
            <div className='flex items-center justify-center gap-2'>
              <CakeIcon fontSize='small'/>
              <span className='font-extralight'>{formattedDate}</span>
            </div>
            <div className='flex items-center justify-center gap-2'>
              <AccessTimeIcon fontSize='small' />
              <span className='font-extralight'>Last seen {formattedLastSeenDate}</span>
            </div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 mt-10 gap-4'>
        <div className='flex flex-col gap-2'>
          <h2>
            Stats
          </h2>
          <Box className='grid grid-cols-2 gap-4 p-4'>
            <div>{user.reputation ?? 0}<div className='font-extralight'>reputation</div></div>
            <div>{user.view_count ?? 0}<div className='font-extralight'>reached</div></div>
            <div>{user.answer_count ?? 0}<div className='font-extralight'>answers</div></div>
            <div>{user.question_count ?? 0}<div className='font-extralight'>questions</div></div>
            <div><EmojiEventsIcon fontSize='small' /><div className='font-extralight'>top <span className='font-normal'>{user.reputation_change_year ?? 0}%</span> this year</div></div>
          </Box>
        </div>
        <div className='flex flex-1 flex-col gap-2'>
          <h2>
            About you
          </h2>
          <div className='w-auto h-auto'>
            {user.about_me && parse(user.about_me)}
          </div>
        </div>
      </div>
      <Badges
        userId={userId}
        gold={user.badge_counts?.gold ?? 0}
        silver={user.badge_counts?.silver ?? 0}
        bronze={user.badge_counts?.bronze ?? 0}
      />
      <Tags
        userId={userId}
      />
      <Posts
        userId={userId}
      />
    </div>
  </div>
}

export default UserPage
