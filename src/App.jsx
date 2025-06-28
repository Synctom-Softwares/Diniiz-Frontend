import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <div className='min-h-screen  flex flex-wrap content-between main'>
      <div className='w-full block'>
        <main >
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default App
