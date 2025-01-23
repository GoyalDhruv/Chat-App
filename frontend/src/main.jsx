import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {Toaster} from 'react-hot-toast'
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <App />
    <Toaster position="top-right" reverseOrder={false} />
  </QueryClientProvider>
)
