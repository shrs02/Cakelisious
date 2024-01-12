import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import backfunc from "../appwrite/website";
import ids from "../ids/ids"
import {useSelector} from 'react-redux'
import { connect } from 'react-redux';
import { setCart } from '../store/ASlice'

function Cardc(props){
    const [post, setPost] = useState(null);
    const [added, setAdd] = useState(false);
    const { slug } = useParams();
    const navigate = useNavigate();
    const user=useSelector((state) => state.log);
    const id=useSelector((state) => state.log.cart);

    useEffect(() => {
        if (slug) {
            backfunc.getPostb(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);
    
    const addCart=async ()=>{
        if(!user.logged){
            alert("Please Login or Signup to use the cart (you can use test acconuts provided in the Login page to Login with them and test the website or you can Signup with a new dummy account as well)");
        }
        else{
            console.log(props)
            const c=props.cart;
            if(c.length==0){
                backfunc.getCart(id)
                .then((cart)=>{
                    const carti=Object.values(cart.carti);
                    const ne='b'+slug+post.price.substring(1);
                    const ncart=[...carti,ne];
                    backfunc.addCart(id,ncart);
                    props.updatec(ncart);
                })
                .catch((error)=>{
                    console.log(error);
                })
            }
            else{
                const carti=c;
                const ne='b'+slug+post.price.substring(1);
                const ncart=[...carti,ne];
                backfunc.addCart(id,ncart);
                props.updatec(ncart);
            }
            setAdd(true);
        }
    }

    return post?(
        <div className=" flex flex-col justify-center align-middle justify-items-center items-center ">
            <div className="w-full flex flex-col lg:flex-row justify-center align-middle justify-items-center items-center my-8 ">
                <div className="p-2 w-full md:w-2/3 bg-opacity-30 rounded-3xl shadow-md shadow-slate-500 bg-pink-300 flex flex-col lg:flex-row justify-center align-middle justify-items-center items-center ">
                    <img 
                        src={backfunc.getFile(post.imgid,ids.BIdw)}
                        alt={post.title}
                        className="my-4 md:ml-6 h-auto rounded-xl w-2/3 md:w-3/12 md:mr-4 shadow-md shadow-slate-500 "
                    />
                    <div className=" md:m-4 shadow-md shadow-slate-500 md:ml-0 md:mr-6 flex flex-col justify-center align-middle justify-items-center items-center bg-gradient-to-r from-rose-300 to-pink-400   rounded-3xl w-full md:w-2/3">
                        <h4 className=" text-lg p-4 font-medium pb-1" >{post.text}</h4>
                        <p className=" text-blue-1000 text-md p-4 pt-0" >{post.desc}</p>
                    </div>
                </div>
            </div>
            <div className=" shadow-md shadow-slate-500 flex flex-col md:flex-row p-2 bg-rose-300 bg-opacity-75 mb-8 w-full md:w-1/3 justify-around rounded-2xl">
                <div className="m-2 mb-0 md:shadow-md md:shadow-slate-500 flex justify-center justify-enenly ">
                    <p className="p-2 bg-rose-200 rounded-l-md text-2xl">
                        Price 
                    </p>
                    <p className="p-2 rounded-r-md text-2xl bg-amber-600">
                        {post.price}
                    </p>
                </div>
                <div className="m-2 mb-0 md:shadow-md md:shadow-slate-500 flex justify-center justify-enenly ">
                    <p className="p-2 bg-rose-200 rounded-l-md text-2xl">
                        Weight 
                    </p>
                    <p className="p-2 rounded-r-md text-2xl bg-amber-600">
                        {post.Weight}
                    </p>
                </div>
                <p className="flex justify-center justify-enenly">
                    {!added&&<button onClick={addCart} className="m-2  md:shadow-md md:shadow-slate-500 text-2xl bg-amber-600 rounded-md p-2 ">
                        Add to cart
                    </button>}
                    {added&&<div className="m-2  md:shadow-md md:shadow-slate-500 text-2xl bg-amber-600 rounded-md p-2 ">
                        Added
                    </div>}
                </p>
            </div>
        </div>
    ):null
}

const mapStateToProps = (state)=>{
    return{
        cart:state.log.carti,
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        updatec:(curr)=>{dispatch(setCart(curr))},
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Cardc)