import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import GamePage from './pages/GamePage'
import ScoresPage from './pages/ScoresPage'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game/:imageId" element={<GamePage />} />
        <Route path="/scores" element={<ScoresPage />} />
      </Routes>
    </Router>
  )
}

export default App
