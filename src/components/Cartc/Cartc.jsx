import React,{ useEffect, useState } from 'react'
import backfunc from "../../appwrite/website";
import ids from '../../ids/ids.js'
import { setCart,setTot } from '../../store/ASlice'
import {useSelector} from 'react-redux'
import { connect } from 'react-redux';


function Cartc(props){
     
    const [post,setPost]=useState(null);
    const file=props.file;
    console.log(props);
    const id=useSelector((state) => state.log.cart);

    useEffect(() => {
        let l = file.substring(0,1);
        let d = file.substring(1,21);
        console.log(l); 
        console.log(d);
        if(l=="b"){
            backfunc.getPostb(d)
            .then((resp) => {
                setPost(resp); 
            })
            .catch((error)=>{
                console.log(error);
            })
        }
        else if(l=="w"){
            backfunc.getPostw(d)
            .then((resp) => {
                let curr =  Number(resp.price.substring(1));
                props.updatet(curr); 
                setPost(resp);
            })
            .catch((error)=>{
                console.log(error);
            })
        }
        else if(l=="c"){
            backfunc.getPostc(d)
            .then((resp) => {
                let curr =  Number(resp.price.substring(1));
                props.updatet(curr); 
                setPost(resp);
            })
            .catch((error)=>{
                console.log(error);
            })
        }
        else if(l=="p"){
            backfunc.getPostp(d)
            .then((resp) => {
                let curr =  Number(resp.price.substring(1));
                props.updatet(curr); 
                setPost(resp);
            })
            .catch((error)=>{
                console.log(error);
            })
        }
    }, []);
    
    const removeCart=()=>{
        const curr=props.cart;
        let l=0;
        const ncart=curr.filter((id)=>{
            if(id==file&&l==0){
                l=1;
                return false;
            }
            else{
                return true;
            }
        })
        props.updatec([...ncart]);
        backfunc.addCart(id,[...ncart]);
    }
    return (
        post?
        <div className='w-full m-2 h-full shadow-md shadow-slate-500 p-2 bg-rose-300 bg-opacity-50 mb-8 flex flex-col align-middle items-center justify-center justify-items-center rounded-2xl'>
            <img 
                src={backfunc.getFile(post.imgid,ids.BIdw)}
                alt={post.title}
                className="rounded-xl w-auto flex "
            />
            <p className='flex align-middle items-center justify-center justify-items-center bg-rose-400 bg-opacity-50 md:mx-11 m-5 mb-0 p-4 px-8 rounded-2xl shadow-lg'>{post.text}</p>
            <div className='pt-4'>Price : {post.price}</div>
            <p>
                <button className='flex align-middle items-center justify-center justify-items-center bg-rose-500 bg-opacity-50 m-5  md:mx-11 p-4 px-8 rounded-2xl shadow-lg' onClick={removeCart}>
                Remove From Cart
                </button>
            </p>
        </div>
        :null
    )
}


const mapStateToProps = (state)=>{
    return{
        cart:state.log.carti,
        total:state.log.total,
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        updatec:(curr)=>{dispatch(setCart(curr))},
        updatet:(tot)=>{dispatch(setTot(tot))},
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Cartc)