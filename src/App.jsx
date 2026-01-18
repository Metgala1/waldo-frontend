import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import GamePage from './pages/GamePage'
import ScoresPage from './pages/ScoresPage'
import './App.css'
import { GameProvider } from './Context/GameContext'

function App() {
  return (
    <GameProvider>
      <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/scores" element={<ScoresPage />} />
      </Routes>
    </Router>
    </GameProvider>
  )
}

export default App
