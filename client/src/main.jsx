import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ENV} from "./config/env.js";
import { ClerkProvider } from '@clerk/clerk-react'
import {BrowserRouter} from "react-router-dom";
import {Toaster} from "react-hot-toast";

const PUBLISHABLE_KEY = ENV.CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
    throw  new Error("Add your Clerk Publishable Key to the .env file")
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <BrowserRouter>
              <App />
          </BrowserRouter>
          <Toaster position={"top-right"}/>
      </ClerkProvider>
  </StrictMode>,
)
