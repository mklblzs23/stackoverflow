import { isEmpty } from 'lodash'
import Box from '../../components/Box'
import { Badge } from '../../types'
import { useMemo } from 'react'

type Props = {
  rank: string
  badgeCount: number
  badgeList: Badge[]
}

export default function BadgeBox(props: Props) {
  const { rank, badgeCount, badgeList } = props

  const dotColor = useMemo(() => {
    switch (rank) {
    case 'gold':
      return 'bg-gold'
    case 'silver':
      return 'bg-silver'
    default:
      return 'bg-bronze'
    }
  }, [rank])

  return <Box className='p-4'>
    {isEmpty(badgeList) ? <div className='grid place-items-center w-full h-full text-center'>
      <img src={`/${rank}_badge.png`} alt={`${rank} badge`} className='w-16 h-16'/>
      <div>This user doesn&apos;t have any {rank} badges yet.</div>
    </div> : <>
      <div className='flex gap-4'>
        <img src={`/${rank}_badge.png`} alt={`${rank} badge`} className='w-14 h-14'/> 
        <div>{badgeCount}<div>{rank} badges</div></div>
      </div>
      <div className='font-extralight mt-4'>
        {badgeList.map(badge => (
          <div key={badge.badge_id} className='flex items-center gap-2 px-2 py-1 w-fit bg-badgeTag round rounded-md mt-2'><div className={`w-2 h-2 round rounded-full ${dotColor}`}></div>{badge.name}</div>
        ))}
      </div>
    </>}
  </Box>
}
