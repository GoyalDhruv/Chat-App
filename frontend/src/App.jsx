import { lazy, Suspense } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Loader from './components/loader/Loader';

const Home = lazy(() => import('./components/pages/HomePage'));
const Chats = lazy(() => import('./components/pages/ChatPage'));

function App() {
  return (
    <div className='App min-h-screen flex'>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/chats' element={<Chats />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
