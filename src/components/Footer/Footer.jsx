import React from 'react'
import Aboutus from '../../pages/Aboutus'
import { Link } from 'react-router-dom'

function Footer (){
    return(
        <div className=' p-6 text-black w-full h-56'>
            <div className='p-4'>
            <Link to='/aboutus'>About us</Link>
            </div>
            <div className='p-4'>
            <Link to='/terms'>Terms and Conditions</Link>
            </div>
        </div>)}
    


export default Footer