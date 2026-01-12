import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import AppWRouterV1 from "./AppWRouterV1.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
             <AppWRouterV1 />
          </BrowserRouter>
  </StrictMode>,
)
