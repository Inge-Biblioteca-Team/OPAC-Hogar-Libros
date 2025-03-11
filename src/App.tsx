
import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router/dom'
import Routes from './Routes'

function App() {

  return (
    <>
  <Toaster/>
  <RouterProvider router={Routes}/>
    </>
  )
}

export default App
