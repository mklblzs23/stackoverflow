import { useState } from 'react'
import BadgeBox from './BadgeBox'
import { Modal } from '@mui/material'
import { isEmpty } from 'lodash'
import { userService } from '../../services'
import { useQuery } from 'react-query'
import { Badge } from '../../types'
import Loader from '../../components/Loader'

type Props = {
  userId: string
  gold: number
  silver: number
  bronze: number
}

export default function Badges(props: Props) {
  const { gold, silver, bronze, userId } = props
  const [isOpenModal, setIsOpenModal] = useState(false)
  const { data: badges, isLoading } = useQuery<Badge[]>({
    queryFn: () => userService.getUserBadges(userId),
    queryKey: ['badges'],
    enabled: !!userId,
  })
  const getRankBadges = (rank: string) => badges ? badges.filter((badge: Badge) => badge.rank === rank) : []

  return <div className='flex flex-col gap-2 mt-10'>
    <div className='flex items-center'>
      <h2 className='text-lg'>
        Badges
      </h2>
      {!isEmpty(badges) && <button
        onClick={() => setIsOpenModal(true)}
        className='ml-auto text-sm text-white font-light bg-transparent focus:outline-none hover:border-transparent hover:outline-none'
      >
        View all badges
      </button>}
    </div>
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      {isLoading ? <Loader />
        : <>
          <BadgeBox
            rank='gold'
            badgeList={getRankBadges('gold')?.slice(0, 3)}
            badgeCount={gold} />
          <BadgeBox
            rank='silver'
            badgeList={getRankBadges('silver')?.slice(0, 3)}
            badgeCount={silver} />
          <BadgeBox
            rank='bronze'
            badgeList={getRankBadges('bronze')?.slice(0, 3)}
            badgeCount={bronze} />
        </>}
    </div>
    {!isEmpty(badges) && (
      <Modal open={isOpenModal} onClose={() => setIsOpenModal(!isOpenModal)}>
        <div className='absolute grid place-items-center overflow-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-background border-2 border-black shadow-lg p-4'>
          <h2 className='text-lg font-medium'>All badges</h2>
          <div className='font-extralight h-full mt-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4'>
            {badges?.map((badge: Badge) => (
              <div key={badge.badge_id} className='flex items-center gap-2 px-2 py-1 w-fit bg-badgeTag round rounded-md mt-2'>
                <div className={`w-2 h-2 round rounded-full bg-${badge.rank}`}></div>
                <p>{badge.name}</p>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    )}
  </div>
}
