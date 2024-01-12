import React from 'react'
import backfunc from "../../appwrite/website"
import ids from '../../ids/ids.js'
function Card ({text,imgid,desc,bid}){
    return(
        <div style={{backgroundImage: `url(${backfunc.getFile(bid,ids.BIdw)})`}} className=' lg:h-68 w-auto bg-opacity-75 flex flex-col items-center bg-white border border-gray-200 md:flex-row rounded-lg shadow  hover:bg-gray-100'>
                <img className="click:animate-ping object-cover w-auto rounded-t-lg h-full lg:h-68 md:w-1/4 rounded-lg" src={backfunc.getFile(imgid,ids.BIdw)} alt=""/>
                <div className="w-full h-full flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 h-full text-2xl font-bold tracking-tight text-gray-900">{text}</h5>
                    <p className="mb-3 h-full font-normal text-gray-700 ">{desc}</p>
                </div>
        </div>
    )
}
    


export default Card