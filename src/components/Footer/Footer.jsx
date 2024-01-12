import React from 'react'
import Aboutus from '../../pages/Aboutus'
import { Link } from 'react-router-dom'

function Footer (){
    return(
        <div className=' bg-gradient-to-r from-rose-500 to-indigo-500 p-6 text-white w-full h-56'>
            <div className='p-4'>
            <Link to='/aboutus'>About us</Link>
            </div>
            <div className='p-4'>
            <Link to='/terms'>Terms and Conditions</Link>
            </div>
        </div>)}
    


export default Footer