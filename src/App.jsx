import { useState } from 'react'
import './App.css'
import SortingVisualizer from './components/SortingVisualizer'
import PathfindingVisualizer from './components/PathfindingVisualizer'

function App() {
  const [view, setView] = useState('sorting')

  return (
    <div>
      <header className="top-nav">
        <button
          className={`nav-button ${view === 'sorting' ? 'nav-button-active' : ''}`}
          onClick={() => setView('sorting')}
        >
          Sorting
        </button>
        <button
          className={`nav-button ${view === 'pathfinding' ? 'nav-button-active' : ''}`}
          onClick={() => setView('pathfinding')}
        >
          Pathfinding
        </button>
      </header>
      {view === 'sorting' ? <SortingVisualizer /> : <PathfindingVisualizer />}
    </div>
  )
}

export default App
