import React,{useState} from 'react';
import Input from '../components/Input/Input'
import {useForm} from "react-hook-form"
import backfunc from "../appwrite/website";
import { setCart,setCust } from '../store/ASlice'
import { connect } from 'react-redux';
import {useSelector} from 'react-redux'

function Buy(props){
    const {register, handleSubmit} = useForm()
    const [paid , setPaid] = useState(false)
    const id=useSelector((state) => state.log.cart);

    const payment = ()=>{
        const ne=[];
        backfunc.addCart(id,[...ne])
        .then(()=>{
            backfunc.custom(id,[...ne]);
        })
        .then(()=>{
            props.updatec([...ne]);
            props.updatecust([...ne]);
        })
        .then(()=>{
            setPaid(true);
        })
    }
    
    return (
        <div className="flex flex-col align-middle justify-center justify-items-center w-full items-center  bg-violet-200 bg-opacity-80  h-full">
            {!paid&&<form onSubmit={handleSubmit(payment)}>
                <h1 className="mt-20 flex align-middle items-center justify-center justify-items-center text-4xl font-bold mb-8">Address</h1>
                <Input 
                label="Address: "
                placeholder="Enter your Address"
                type="text"
                {...register("Address", {
                })}
                />
                <h1 className="mt-20 flex align-middle items-center justify-center justify-items-center text-4xl font-bold mb-8">Card</h1>
                <Input 
                label="Card Details: "
                placeholder="Enter your Card Details"
                type="text"
                {...register("Card Details", {
                })}
                />
                <h1 className='mt-20 flex align-middle items-center justify-center justify-items-center text-2xl font-bold mb-8'>Or</h1>
                <h1 className='mt-20 flex align-middle items-center justify-center justify-items-center text-4xl font-bold mb-8'>UPI</h1>
                <Input 
                label="Phone Number: "
                placeholder="Enter your Phone Number"
                type="number"
                {...register("Phone Number", {
                })}
                />
                <div className=' m-16 flex align-middle justify-center justify-items-center'>
                    <button type="submit" className=' bg-purple-500 bg-opacity-100 md:mx-11 p-4 px-8 rounded-2xl shadow-lg'>
                        Proceed
                    </button>
                </div>
            </form>}
            {paid&&<div className='text-3xl m-48'>Your Order Will Arive Soon!</div>}
        </div>
  )
}


const mapDispatchToProps = (dispatch)=>{
    return{
        updatec:(curr)=>{dispatch(setCart(curr))},
        updatecust:(cust)=>{dispatch(setCust(cust))},
    }
}

export default connect(null,mapDispatchToProps)(Buy);
