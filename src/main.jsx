import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import VigenereCipher from "./VigenereCipher.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <VigenereCipher />
  </StrictMode>,
)
