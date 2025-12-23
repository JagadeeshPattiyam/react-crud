//import { useState } from 'react'
import Header from './components/Header'
import './App.css'
import Users from './pages/users'

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Users />
      </div>
    </>
  )
}

export default App
