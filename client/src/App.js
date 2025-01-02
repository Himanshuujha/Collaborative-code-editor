import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import EditorPage from './components/EditorPage'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/editor/:roomId' element={<EditorPage/>}></Route>
    </Routes>
  )
}

export default App
