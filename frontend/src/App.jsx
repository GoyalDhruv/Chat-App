import { lazy, Suspense } from 'react'
import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// Dynamically import the components
const Home = lazy(() => import('./components/pages/HomePage'));
const Chats = lazy(() => import('./components/pages/ChatPage'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/chats' element={<Chats />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
