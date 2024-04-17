import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Header from './homepage/Header'
import Navlist from './homepage/Navlist'
import Footer from './homepage/Footer'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Header/>
      <Navlist/>
      <Footer/>
    </div>
  )
}

export default App
