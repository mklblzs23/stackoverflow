import { useMemo, useState } from 'react'
import Box from '../../components/Box'
import { isEmpty } from 'lodash'
import { Modal } from '@mui/material'
import { userService } from '../../services'
import { useQuery } from 'react-query'
import { Tag } from '../../types'
import Loader from '../../components/Loader'

type Props = {
  userId: string
}

export default function Tags(props: Props) {
  const { userId } = props
  const { data: tags, isLoading } = useQuery<Tag[]>({
    queryFn: () => userService.getUserTags(userId),
    queryKey: ['tags'],
    enabled: !!userId,
  })
  const [isOpenModal, setIsOpenModal] = useState(false)

  const allTagsCount = useMemo(() => {
    return tags ? tags?.reduce((a: number, c: Tag) => a + c.count, 0) : 0
  }, [tags])

  const getTagPercentage = (tagCount: number) => {
    if (!allTagsCount) return 0
    return Math.ceil((tagCount / allTagsCount) * 100)
  }

  return <div className='flex flex-col mt-10 gap-4'>
    <div className='flex items-center'>
      <h2 className='text-lg'>
        Top tags
      </h2>
      {!isEmpty(tags) && <button
        onClick={() => setIsOpenModal(true)}
        className='ml-auto text-sm text-white font-light bg-transparent focus:outline-none hover:border-transparent hover:outline-none'
      >
        View all tags
      </button>}
    </div>
    {isLoading ? <Loader />
      : <Box className='p-0'>
        {isEmpty(tags) ? <div className='grid place-items-center p-10'>
          NO TAGS
        </div> : tags?.slice(0,5).map((tag: Tag) => (
          <div key={tag.name} className='flex border-b border-border p-4'>
            <span>{tag.name}</span>
            <div className='ml-auto flex gap-2'>
              {tag.count} <span className='font-extralight mr-4'>posts</span>
              {getTagPercentage(tag.count)} <span className='font-extralight'>posts %</span>
            </div>
          </div>
        ))}
      </Box>}
    {!isEmpty(tags) && <Modal
      open={isOpenModal}
      onClose={() => setIsOpenModal(!isOpenModal)}
    >
      <div className='absolute grid place-items-center overflow-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-background border-2 border-black shadow-lg p-4'>
        <h2 className='text-lg font-medium'>All tags</h2>
        <div className='font-extralight w-full h-full'>
          {tags?.map((tag: Tag) => (
            <div key={tag.name} className='grid grid-cols-1 sm:grid-cols-2 border-b border-border p-4'>
              <span>{tag.name}</span>
              <div className='ml-auto flex gap-2'>
                {tag.count} <span className='font-extralight mr-4'>posts</span>
                {getTagPercentage(tag.count)} <span className='font-extralight whitespace-nowrap'>posts %</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>}
  </div>
}
