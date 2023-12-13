import { ChangeEvent, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import QuestionRow from './QuestionRow'
import Search from '../../components/Search'
import useDebounce from '../../hooks/useDebounce'
import { stackoverflowService } from '../../services/stackoverflowService'
import toast from 'react-hot-toast'
import Loader from '../../components/Loader'

type List = {
  title: string
  question_id: number
  tags: string[]
  view_count: number
  answer_count: number
  score: number
  owner: {
    user_id: number
    display_name: string
    reputation: number,
    profile_image: string,
  }
  creation_date: number
  body: string
}

const SearchPage = () => {
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [list, setList] = useState<List[]>([])
  const debounceSearch = useDebounce(search)

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | undefined>) => {
    const value = event?.target?.value
    setSearch(value)
  }

  useEffect(() => {
    let isCancelled = false

    const loadData = async () => {
      setIsLoading(true)
      const data = await stackoverflowService.search(debounceSearch)

      if (!isCancelled) {
        if (data && 'error_message' in data) {
          toast.error(data.error_message)
        } else {
          setList(data.items)
        }
      }
      setIsLoading(false)
    }
    
    if (debounceSearch) {
      loadData()
    } else {
      setList([])
    }

    return () => {
      isCancelled = true
    }
  }, [debounceSearch])

  return <div className='w-full h-full'>
    <Navbar>
      <Search onChange={onChangeSearch}/>
    </Navbar>
    <div className='px-2.5 py-1.5 md:px-20 md:py-10 border border-border'>
      <h1 className='text-2xl font-bold md:text-3xl lg:text-4xl'>
        Search results
      </h1>
      <p className='text-md font-light mt-4'>Results for {debounceSearch}</p>
      <p className='mt-4'>{list?.length ?? 0} results</p>
    </div>
    {isLoading ? <Loader /> : list?.map(row => (
      <QuestionRow
        key={row.question_id}
        title={row.title}
        votes={row.score ?? 0}
        answers={row.answer_count ?? 0}
        views={row.view_count ?? 0}
        content={row.body}
        tags={row.tags}
        name={row.owner?.display_name}
        profilePicture={row.owner?.profile_image}
        asked={row.owner?.reputation ?? 0}
        date={row.creation_date}
        userId={row.owner?.user_id}
      />
    ))}
  </div>
}

export default SearchPage
