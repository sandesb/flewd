import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store'
import HumanBodyWaterFill from './components/HumanBodyWaterFill'
import Moon from './components/Moon'
import { Toaster } from 'react-hot-toast'
import Snowfall from 'react-snowfall'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div style={{ position: 'relative', minHeight: '100vh', width: '100%' }}>
          <Snowfall 
            snowflakeCount={600} 
            color='#2196f3'
          />
          {/* Routes */}
          <Routes>
            <Route path="/" element={<HumanBodyWaterFill />} />
            <Route path="/moon" element={<Moon />} />
          </Routes>

          <Toaster />
        </div>
      </Router>
    </Provider>
  )
}

export default App
