import React, { useState, useEffect } from 'react'
import {Header,Footer,Intro} from './components'
import { Outlet } from 'react-router-dom'


function App() {

  return (
    <div className="bg-[url('https://cdn.pixabay.com/photo/2016/07/11/17/45/abstract-1510192_960_720.png')]">
      <div className='bg-purple-300 bg-opacity-80 p-6 '>
        <Header/>
      </div>
      
      <div className='bg-purple-300 bg-opacity-80'>
        <Outlet/>
      </div>
      <div className=' bg-purple-200 bg-opacity-70'>
        <Footer/>
      </div> 
    </div>
      
  )
}

export default App
