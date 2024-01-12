import React, {useEffect, useState} from 'react'
import backfunc from "../appwrite/website";
import {Cardp} from '../components'
import {Link} from 'react-router-dom'


function Wed(){
    const [cards,setCards]=useState([])
    useEffect(()=>{
        backfunc.getWedDocuments().then((files)=>{
            if(files){
                setCards(files.documents)
                console.log(files.documents)
            }
        })
    },[])

    return(
        <div className='w-full h=auto flex flex-col'>
            <div className='w-full p-8 flex flex-wrap'>
                {cards.map((file)=>(
                    <Link to={`/cardw/${file.$id}`} className='w-full  md:w-1/3'>
                    <div key={file.$id} className='w-full h-full'>
                        <Cardp  {...file}/>
                    </div>
                    </Link>
                ))
                }
            </div>
        </div>
    )
}

export default Wed