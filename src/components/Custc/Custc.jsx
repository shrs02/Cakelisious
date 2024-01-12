import React,{ useEffect, useState } from 'react'
import backfunc from "../../appwrite/website";
import ids from '../../ids/ids.js'
import { setCust } from '../../store/ASlice'
import {useSelector} from 'react-redux'
import { connect } from 'react-redux';


function Custc(props){

    const [post,setPost]=useState(null);
    const file=props.file;
    console.log(props);
    const id=useSelector((state) => state.log.cart);

    useEffect(() => {
        let l = file.substring(0,20);
        let d = file.substring(22,file.length);
        console.log('l',l); 
        console.log('d',d);
        setPost({id:l,decs:d});
    }, []);
    
    const removeCart=()=>{
        const curr=props.cust;
        const ncart=curr.filter((id)=>{
            if(id==file){
                return false;
            }
            else{
                return true;
            }
        })
        backfunc.deleteFile(post.id)
        .then(()=>{
            props.updatecust([...ncart]);
            backfunc.custom(id,[...ncart]);
        })
    }
    return (
        post?
        <div className='w-full m-2 h-full shadow-md shadow-slate-500 p-2 bg-rose-300 bg-opacity-50 mb-8 flex flex-col align-middle items-center justify-center justify-items-center rounded-2xl'>
            <img 
                src={backfunc.getFile(post.id,ids.BIdw)}
                alt={post.decs}
                className="rounded-xl w-auto flex "
            />
            <p  className='flex align-middle items-center justify-center justify-items-center bg-rose-400 bg-opacity-50 md:mx-11 m-5 mb-0 p-4 px-8 rounded-2xl shadow-lg'>{post.decs}</p>
            <div className='pt-4'>Price : ₹1000</div>
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
        cust:state.log.custom,
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        updatecust:(curr)=>{dispatch(setCust(curr))},
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Custc)