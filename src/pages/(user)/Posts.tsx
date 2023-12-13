import { isEmpty } from 'lodash'
import { useMemo, useState } from 'react'
import Box from '../../components/Box'
import { dateTimeUtils } from '../../utils'
import PostTab from './PostTab'
import { Post, PostType } from '../../types'
import { Modal } from '@mui/material'
import { useQuery } from 'react-query'
import { userService } from '../../services'

type Props = {
  userId: string
}

export default function Posts(props: Props) {
  const { userId } = props
  const [isOpenModal, setIsOpenModal] = useState(false)
  const tab = useMemo(() => ([
    {
      title: 'All',
      type: PostType.all
    },
    {
      title: 'Answers',
      type: PostType.answer
    },
    {
      title: 'Questions',
      type: PostType.question
    }
  ]), [])
  const [selectedTab, setSelectedTab] = useState(tab[0])
  const { data: posts, isLoading } = useQuery<Post[]>({
    queryFn: () => userService.getUserPosts(userId),
    queryKey: ['posts'],
    enabled: !!userId,
  })

  const postList = useMemo(() => {
    if (!posts) return []
    switch (selectedTab.type) {
    case PostType.answer:
      return posts.filter((post: Post) => post.post_type === 'answer')
    case PostType.question:
      return posts.filter((post: Post) => post.post_type === 'question')
    default:
      return posts
    }
  }, [selectedTab, posts])
  
  const openModal = (tab: { title: string, type: PostType }) => {
    setIsOpenModal(true)
    setSelectedTab(tab)
  }

  return <div className='flex flex-col mt-10 gap-4'>
    <div className='flex items-center'>
      <div>
        <h2 className='first-letter:uppercase lowercase text-lg'>
          Top {selectedTab.title === 'All' ? 'posts' : selectedTab.title}
        </h2>
        <div className='text-sm'>
          View all <a className='text-sky-700 cursor-pointer' onClick={() => openModal(tab[2])}>questions</a> and <a className='text-sky-700 cursor-pointer' onClick={() => openModal(tab[1])}>answers</a>
        </div>
      </div>
      {!isEmpty(posts) && <PostTab postTypes={tab} onClick={setSelectedTab} className='ml-auto' />}
    </div>
    {isLoading ? <span>Loading</span>
      : <Box className='p-0'>
        {isEmpty(postList) ? <div className='grid place-items-center p-10 uppercase'>
            NO {selectedTab.title === 'All' ? 'posts' : selectedTab.title}
        </div> : postList.slice(0,5).map((post: Post) => (
          <div key={post.post_id} className='flex items-center border-b border-border p-4 gap-4'>
            <span>{post.post_type === 'answer' ? 'A' : 'Q'}</span>
            <span className='rounded-xl round border-border border-2 px-6 py-2'>{post.score}</span>
            <span>{post.title}</span>
            <span className='ml-auto'>{dateTimeUtils.timestampToFormattedDate(post.creation_date)}</span>
          </div>
        ))}
      </Box>}
    {!isEmpty(postList) && <Modal
      open={isOpenModal}
      onClose={() => setIsOpenModal(!isOpenModal)}
    >
      <div className='absolute grid place-items-center overflow-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-background border-2 border-black shadow-lg p-4'>
        <h2 className='text-lg font-medium'>All {selectedTab.title}</h2>
        <div className='font-extralight w-full h-full'>
          {postList.map((post: Post) => (
            <div key={post.post_id} className='grid grid-cols-1 md:grid-cols-3 place-items-center border-b border-border p-4 gap-4'>
              <span className='rounded-xl round border-border border-2 px-6 py-2'>{post.score}</span>
              <span>{post.title}</span>
              <span className='ml-auto whitespace-nowrap'>{dateTimeUtils.timestampToFormattedDate(post.creation_date)}</span>
            </div>
          ))}
        </div>
      </div>
    </Modal>}
  </div>
}
