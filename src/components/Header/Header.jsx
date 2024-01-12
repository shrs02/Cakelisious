import React from 'react'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import {Logout} from '../index'
import c1 from './Cakelisious.png'

function Header (){
    const log=useSelector((state) => state.log.logged)
    
    return(
        <div className=' flex justify-between bg-gradient-to-r from-purple-500 to-pink-500 m-2 rounded-2xl w-auto h-32 p-6'>
                <div className='w-1/3 md:w-20 text-sm  '>
                    <Link to='/' className=' w-20 flex flex-col items-center' >
                        <img src={c1} className=' shadow-2xl rounded-2xl w-full'/>
                        <div className=' text-white pl-2'>Home</div>
                    </Link>
                </div>
                <div className=' px-4 text-xs md:text-xs lg:text-sm '>Please Log In or Sign Up to use the cart feature of the website. You can use a test account tests1@one.com with passsword 123456789 for Log In or you can create a dummy account using Sign Up as well.</div>
                <div className=' flex align-middle items-center justify-items-center justify-between '>
                    {!log && <Link to="/login">
                                <div className='m-2 text-white bg-purple-500 bg-opacity-100 md:mx-11 p-4 px-8 rounded-2xl shadow-lg'>
                                    Log In
                                </div>
                            </Link>
                    }
                    {!log && <Link to="/signup">
                                <div className='m-2 text-white bg-purple-500 bg-opacity-100 md:mx-11 p-4 px-8 rounded-2xl shadow-lg'>
                                        Sign Up
                                </div>
                            </Link>
                    }
                    {log && <div>
                                <Logout/>
                            </div>
                    }
                    {log &&<Link to="/cart">
                                <div className='m-2 text-white bg-purple-500 bg-opacity-100 md:mx-11 p-4 px-8 rounded-2xl shadow-lg'>
                                    Cart
                                </div>
                            </Link>
                    }
                </div>
        </div>
    )
}

export default Header