import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import { Provider } from './context/Provider.jsx'
import './styles/auth.scss'
import "./styles/admin.scss"
import "./styles/mq.scss"


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider>
      <App />
      <Toaster/>
    </Provider>
  </React.StrictMode>,
)
