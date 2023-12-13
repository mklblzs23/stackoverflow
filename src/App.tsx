import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SearchList from './pages/(search)/SearchPage'
import UserDetails from './pages/(user)/UserPage'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route index Component={SearchList} />
          <Route path='/user/:userId' Component={UserDetails} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
