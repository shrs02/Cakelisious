import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {  Input  } from "../components/index";
import backfunc from "../appwrite/website";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { connect } from 'react-redux';
import { setCart,setCust } from '../store/ASlice'

function Custom(props){

    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();
    const id=useSelector((state) => state.log.cart);
    const log=useSelector((state) => state.log.logged);
    const [added, setAdd] = useState(false);
    const [data, setData] = useState(false);

    useEffect(()=>{
        setAdd(false);
    },[])

    const submit = async (data) => {
        if(!log){
            alert("Please Login or Signup to use the cart (you can use test acconuts provided in the Login page to Login with them and test the website or you can Signup with a new dummy account as well)");
        }
        else{
            console.log(data);
            const file = await backfunc.uploadFile(data.image[0]);
            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                data.cartid=id;
                console.log(data);
                const c=props.custom;
                if(c.length==0){
                    backfunc.getCart(id)
                    .then((cart)=>{
                        const carti=Object.values(cart.custom);
                        const ne=data.featuredImage+'  '+data.desc;
                        const ncart=[...carti,ne];
                        backfunc.custom(id,ncart);
                        props.updatecust(ncart);
                    })
                    .catch((error)=>{
                        console.log(error);
                    })
                }else{
                    const carti=c;
                    const ne=data.featuredImage+'  '+data.desc;
                    const ncart=[...carti,ne];
                    console.log(ncart);
                    backfunc.custom(id,ncart);
                    props.updatecust(ncart);
                }
                setAdd(true);
            }
        }
    };

    return (
        <div className="flex flex-col items-center w-full h-full">
            <div className="folt-bold text-3xl m-4">Place Custom Orders</div>
            <div className="text-xl p-4">Give the description of the custom cake and add a reference photo for the custom cake as well</div>
            <form onSubmit={handleSubmit(submit)} className="flex flex-wrap flex-col w-full h-full align-middle items-center justify-center justify-items-center">
            <div className=" w-11/12 h-auto  px-2">
                    <Input
                        label="Name the cake ( give any custom name as you may wish ) :"
                        className=" h-16 overflow-y-scroll"
                        {...register("desc", { required: true })}
                    />
                </div>
                <div className=" w-11/12 h-auto  px-2">
                    <Input
                        label="Flavour :"
                        className=" h-16 overflow-y-scroll"
                        {...register("fla", { required: true })}
                    />
                </div>
                <div className=" w-11/12 h-auto  px-2">
                    <Input
                        label="Filling :"
                        className=" h-16 overflow-y-scroll"
                        {...register("fill", { required: true })}
                    />
                </div>
                <div className=" w-11/12 h-auto  px-2">
                    <Input
                        label="Decoration :"
                        className=" h-32 overflow-y-scroll"
                        {...register("dec", { required: true })}
                    />
                </div>
                <div className="w-11/12 h-1/2 p-2">
                    <Input
                        label="Image :"
                        type="file"
                        className="mb-4 h-16"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: true })}
                    />   
                </div>
                {!added&&<button type="submit" className='flex h-full align-middle items-center justify-center justify-items-center w-40 m-8 bg-purple-500 bg-opacity-100  p-4 px-8 rounded-2xl shadow-lg'>
                    Add To cart
                </button>}
                {added&&<div className='flex align-middle items-center justify-center justify-items-center w-40 m-8 bg-purple-500 bg-opacity-100  p-4 px-8 rounded-2xl shadow-lg'>
                    Added
                </div>}
            </form>
        </div>
    );
}

const mapStateToProps = (state)=>{
    return{
        cart:state.log.carti,
        custom:state.log.custom,
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        updatec:(curr)=>{dispatch(setCart(curr))},
        updatecust:(cust)=>{dispatch(setCust(cust))},
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Custom)