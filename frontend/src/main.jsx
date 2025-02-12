import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast'
import ChatProvider from './context/ChatProvider.jsx';
const queryClient = new QueryClient()
import { BrowserRouter as Router } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <Router>
    <ChatProvider>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster position="top-right" reverseOrder={false} />
      </QueryClientProvider>
    </ChatProvider>
  </Router>
)
