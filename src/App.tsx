import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SearchList from './pages/SearchList'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route index Component={SearchList} />
        </Routes>
      </QueryClientProvider>
      
    </BrowserRouter>
  )
}

export default App
