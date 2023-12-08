import Navbar from './components/Navbar'
import Search from './components/Search'

function App() {

  return <div className='w-screen h-screen'>
    <Navbar>
      <Search />
    </Navbar>
    <div className='px-2.5 py-1.5 md:px-20 md:py-10 border-b border-border'>
      <h1 className='text-2xl font-bold md:text-3xl lg:text-4xl'>
        Search results
      </h1>
    </div>
    <div className='px-2.5 py-1.5 md:px-20 md:py-10 border-b border-border flex align-middle gap-10'>
      <div className='flex flex-col gap-2 text-right'>
        <span className='whitespace-nowrap'>52 votes</span>
        <span className='text-answerTag border border-answerTag rounded-md p-1 whitespace-nowrap'>14 answers</span>
        <span className='text-viewsTag whitespace-nowrap'>59k views</span>
      </div>
      <div className='flex flex-col gap-1'>
        <h2 className='text-rowTitle font-bold text-xl'>Some title</h2>
        <p className='line-clamp-2'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dapibus, mauris ut venenatis aliquet, turpis tortor suscipit eros, eget accumsan lorem erat laoreet elit. Donec eu velit a sem bibendum volutpat. Donec vehicula elit in libero placerat, dictum pretium arcu malesuada. Ut metus elit, faucibus ut nibh sed, volutpat congue lacus. Suspendisse sit amet quam ullamcorper, molestie nisl id, sollicitudin diam. Etiam risus massa, rhoncus sed tortor at, dignissim pulvinar nulla. Nullam viverra nisl et viverra placerat. Maecenas et est at dui vulputate pulvinar. Suspendisse lacus ante, pulvinar in justo quis, malesuada semper ante.
        </p>
        <div className='flex mt-2'>
          <span className='bg-tag px-2 py-1 mr-4 rounded-md'>React.js</span>
          <span className='bg-tag px-2 py-1 mr-4 rounded-md'>Next.js</span>
          <div className='flex gap-2 ml-auto items-center'>
            {/*TODO: small profile picture */}
            <span>MB</span>
            <span className='text-rowTitle'>Miklós Balázs</span>
            <span>3,835 asked</span>
            <span className='font-extralight'>Dec. 8, 2023 at 9:03</span>
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default App
