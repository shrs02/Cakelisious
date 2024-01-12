import React, { useState, useEffect } from 'react'
import {Header,Footer,Intro} from './components'
import { Outlet } from 'react-router-dom'


function App() {

  return (
    <div className=' bg-violet-200 bg-opacity-80'>
      <div>
        <Header/>
      </div>
      
      <div>
        <Outlet/>
      </div>
      <div>
        <Footer/>
      </div> 
    </div>
      
  )
}

export default App
