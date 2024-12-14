import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GroupProvider } from './context/groupContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { NoteProvider } from './context/noteContext.jsx'
import { ModalProvider } from './context/modalContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GroupProvider>
      <NoteProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </NoteProvider>
    </GroupProvider>
  </BrowserRouter>
)
