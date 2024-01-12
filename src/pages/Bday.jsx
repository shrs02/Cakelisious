import React, {useEffect, useState} from 'react'
import backfunc from "../appwrite/website";
import {Cardp} from '../components'
import {Link} from 'react-router-dom'
import Cardc from './Cardc'
function Bday(){
    const [cards,setCards]=useState([])
    const [visi,setVisi]=useState(false)
    useEffect(()=>{
        backfunc.getBdayDocuments().then((files)=>{
            if(files){
                setCards(files.documents)
                console.log(files.documents)
            }
        })
    },[])
    
    return(
        <div className='w-full flex flex-col'>
            <div className='w-full h-auto p-8 flex flex-wrap'>
                {cards.map((file)=>(
                    <Link to={`/cardc/${file.$id}`} className=' w-full md:w-1/3'>
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

export default Bday