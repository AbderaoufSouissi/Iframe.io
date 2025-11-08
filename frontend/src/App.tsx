import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { Toaster } from 'react-hot-toast'
import UserSyncHandler from './components/UserSyncHandler'
const App = () => {
  return (
    <div>
      <UserSyncHandler />
      <Toaster/>
    
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      </div>
  )
}

export default App