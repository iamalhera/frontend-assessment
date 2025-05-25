import { useState } from 'react'
import './App.css'
import StorySection from './components/StorySection'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h3>Cactro assessment - Frontend - 25-05-2025</h3>
      <h4>Instagram Stories - Feature</h4>
      <div className="phone">
        <StorySection />
      </div>
    </>
  )
}

export default App
