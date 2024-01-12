import React from 'react'
import {useDispatch} from 'react-redux'
import autho from '../../appwrite/autho'
import {logout as alogout} from '../../store/ASlice'

function Logout(){
    const dispatch = useDispatch()
    const logoutHandler = async ()=>{
        try{
            const curr =  await autho.logoutData()
            if(curr){
                dispatch(alogout())
            }
        }
        catch (error){
            console.log(error)
        }
    }
    return(
        <button 
        className='m-2 text-white bg-purple-500 bg-opacity-100 md:mx-11 p-4 px-8 rounded-2xl shadow-lg'
        onClick={logoutHandler}
        >
            Log Out
        </button>
    )
}

export default Logout