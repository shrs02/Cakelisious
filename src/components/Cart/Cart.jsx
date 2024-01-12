import React,{ useEffect, useState ,useRef} from 'react'
import backfunc from "../../appwrite/website";
import {useSelector} from 'react-redux'
import {Cartc,Custc} from '../index'
import { setCart ,setCust} from '../../store/ASlice'
import { connect } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom'

function Cart(props){

    const [cards,setCards]=useState()
    const [custo,setCust]=useState(false)
    const [carto,setCart]=useState(false)
    const id=useSelector((state) => state.log.cart);
    const c=props.cart;
    const cust=props.custom;
    const [loading ,setLoading]=useState(true);
    const [total,setTotal]= useState(0);
    useEffect(()=>{
        console.log(c);
        console.log(props);
        if(c.length==0){
            backfunc.getCart(id).then((files)=>{
                if(files){
                    setCards(files);
                }
            })
        }
    },[])

    useEffect(()=>{
        console.log('kgdfknv',cards);
        if(cards){
            const curr=Object.values(cards.carti);
            console.log(curr);
            props.updatec(curr);
            const currcust=Object.values(cards.custom);
            console.log(currcust);
            props.updatecust(currcust);
        }
        
    },[cards])

    useEffect(()=>{
        console.log('lll',c);
        if(c.length!=0)
        setCart(true)
        setLoading(false);
    },[c])

    useEffect(()=>{
        let tot = 0;
        if(c.length!=0){
            tot += c.reduce((accumulator, currentValue) => {
                const curr = currentValue.substring(21);
                return accumulator + Number(curr);
            }, 0);
            console.log(tot);
        }
        if(cust.length!=0){
            tot += cust.reduce((accumulator, currentValue) => {
                return accumulator + 1000;
            }, 0);
            console.log(tot);
        }
        setTotal(tot)
    },[c,cust])

    useEffect(()=>{
        console.log('lll',cust);
        if(cust.length!=0)
        setCust(true);
    },[cust])

    return(
        !loading?
        <div className='flex flex-col align-middle items-center justify-center justify-items-center' >
            <h1 className='flex align-middle items-center justify-center justify-items-center text-3xl w-full bg-rose-500 bg-opacity-30 m-5 mt-0 p-4 px-8 rounded-2xl shadow-lg'>Cart</h1>
            {carto&&<div className='w-full h-auto p-8 flex flex-wrap'>
                    {c.map((file)=>{
                    console.log('lll',file)
                    return(
                        <div className='w-full md:w-1/4 p-4'>
                            <div key={file} className='w-full h-full'>
                                <Cartc  file={file} />
                            </div>
                        </div>
                    )
                    })
                }
            </div>}
            {c.length==0&&<h3 className=' h-32'>Empty</h3>}
            <h2 className='flex align-middle items-center justify-center justify-items-center w-full text-3xl bg-rose-500 bg-opacity-30 m-5  p-4 px-8 rounded-2xl shadow-lg'>Custom Orders</h2>
            {custo&&<div className='w-full h-auto p-8 flex flex-wrap'>
                {cust.map((file)=>{
                    console.log('lll',file)
                    return(
                        <div className='w-full md:w-1/4 p-4'>
                            <div key={file} className='w-full h-full '>
                                <Custc  file={file} />
                            </div>
                        </div>
                    )
                    })
                }
            </div>}
            {!custo&&cust.length==0&&<h3 className='h-32'>Empty</h3>}
            <div className='m-10  md:shadow-md md:shadow-slate-500 text-2xl bg-amber-500 rounded-md py-2 px-6 '>
                Total : ₹{total}            </div>
            <div className='mb-10  md:shadow-md md:shadow-slate-500 text-3xl p-3 bg-amber-500 rounded-md '>
                <Link to='/buy'>
                    Buy Now
                </Link>
            </div>
        </div>:<h3>loading</h3>
    )
}

const mapStateToProps = (state)=>{
    return{
        cart:state.log.carti,
        custom:state.log.custom,
        tot:state.log.total,
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        updatec:(curr)=>{dispatch(setCart(curr))},
        updatecust:(cust)=>{dispatch(setCust(cust))},
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Cart)