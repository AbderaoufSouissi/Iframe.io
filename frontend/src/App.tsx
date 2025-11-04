import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <div>
      <Toaster/>
    
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      </div>
  )
}

export default App