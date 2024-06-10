import React,{useState} from 'react'
import backfunc from "../../appwrite/website"
import ids from '../../ids/ids.js'

function Cardp ({imgid,text,desc,price}){

    return(
        <div className=" w-full h-full  rounded-3xl p-4 bg-rose-50  border-4 border-slate-grey-500 shadow flex flex-col justify-center items-center">
            <img className="rounded-lg" src={backfunc.getFile(imgid,ids.BIdw)} alt="" />
            <div className="">
                <h5 className="p-2 text-2xl font-bold tracking-tight text-gray-900 ">{text}</h5>
                <h5 className="p-2 text-2xl font-bold tracking-tight text-gray-900 ">Price : {price}</h5>
            </div>
            
        </div>
    )
}
    


export default Cardp