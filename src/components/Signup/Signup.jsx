import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as alogin } from '../../store/ASlice'
import {useDispatch} from "react-redux"
import autho from "../../appwrite/autho"
import {useForm} from "react-hook-form"
import {Input} from "../index"
import c1 from '../Header/Cakelisious.png'
import Footer from '../Footer/Footer'

function Signup(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const log = async (data)=>{
        setError("")
        try{
            const curr =  await autho.createUser(data)
            if(curr){
                const user = await autho.getUser()
                console.log(curr)
                if(user){
                    console.log(user)
                    dispatch(alogin({user,curr}))
                    navigate("/")
                }
                
            }
        }
        catch(error){
            setError(error.message)
        }
    }

    return (
        <div className='flex flex-col align-middle justify-center justify-items-center w-full items-center  bg-violet-200 bg-opacity-80  h-full'>
            <div className=' p-10 flex flex-col align-middle justify-center justify-items-center w-full items-center  '>
                <div className=' p-4 mb-4  w-1/3  flex align-middle justify-center justify-items-center items-center  '>
                    <Link to='/' className=' flex align-middle justify-center justify-items-center items-center  '>
                        <img src={c1} className=' shadow-2xl rounded-2xl w-5/12'/>
                    </Link>
                </div>
                <Link to="/login">
                    <div className=' bg-purple-500 bg-opacity-100 md:mx-11 p-4 px-8 rounded-2xl shadow-lg'>
                            Go To Log In
                    </div>
                </Link>
                <div>
                    {error && <div className=' p-4 '>{error}</div>}
                </div>
                <div className='w-full flex flex-col items-center '>
                    <form onSubmit={handleSubmit(log)}>
                        <div className=' p-4 w-full'>
                            <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: true,
                            })}
                            />
                            <Input 
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                                }
                            })}
                            />
                            <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                            />
                        </div>
                        <div className='flex align-middle justify-center justify-items-center'>
                            <button type="submit" className=' bg-purple-500 bg-opacity-100 md:mx-11 p-4 px-8 rounded-2xl shadow-lg'>
                                Sign up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Signup