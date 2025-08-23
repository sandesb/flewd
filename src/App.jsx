import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import HumanBodyWaterFill from './components/HumanBodyWaterFill'
import Moon from './components/Moon'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <Router>
      <div>
    

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HumanBodyWaterFill />} />
          <Route path="/moon" element={<Moon />} />
        </Routes>

        <Toaster />
      </div>
    </Router>
  )
}

export default App
