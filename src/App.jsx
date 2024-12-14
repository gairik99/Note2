import './App.css'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import SingleNote from './pages/SingleNote'

function App() {


  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/notes/:id' element={<SingleNote />} />
    </Routes>
  )
}

export default App
