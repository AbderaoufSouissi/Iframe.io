import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { Toaster } from 'react-hot-toast'
import UserSyncHandler from './components/UserSyncHandler'
import Result from './pages/Result'
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react'
const App = () => {
  return (
    <div>
      <UserSyncHandler />
      <Toaster/>
    
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/result" element={
          <>
            <SignedIn><Result /></SignedIn>
            <SignedOut><RedirectToSignIn /></SignedOut>
          </>
        } />
      </Routes>
      </div>
  )
}

export default App