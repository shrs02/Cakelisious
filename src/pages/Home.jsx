import React, {useEffect, useState} from 'react'
import backfunc from "../appwrite/website";
import {Card,Intro} from '../components'
import { Link } from 'react-router-dom'
function Home(){
    const [cards,setCards]=useState([])
    useEffect(()=>{
        backfunc.getDocuments().then((files)=>{
            if(files){
                setCards(files.documents)
                console.log(files.documents)
            }
        })
    },[])

    return(
        <div className='w-full h=auto flex flex-col'>
            <div>
                <Intro/>
            </div>
            <nav className='p-2 bg-rose-300 bg-opacity-40 mb-16 mx-8 rounded-3xl w-auto flex-col items-center justify-center justify-items-center'>
                <h2 className=' text-3xl p-4 m-4 font-bold  '>Premade Cakes </h2>
                <div className='flex flex-row flex-wrap w-full align-middle items-center justify-center justify-items-center' >
                    {cards.map((file)=>(
                        <div className='p-8 lg:w-1/2'>
                            <Link to={file.slug} className=''>
                                <div  key={file.imgid}  >
                                    <Card  {...file}/>
                                </div>
                            </Link>
                        </div>
                    ))
                    }
                </div>
                <div className='rounded-3xl m-4 py-2  md:py-16 lg:py-20 '>
                    <section className="w-full border-spacing-2 py-8">
                        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
                        <div className="space-y-3">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Customize Cakes </h2>
                            <p className="mx-auto max-w-[700px] text-black  text-xl ">
                            We offer a wide range of customization options to make your cake as unique as you are.
                            </p>
                        </div>
                        <div className="divide-y rounded-lg border">
                            <div className="flex flex-col md:grid w-full items-stretch justify-center divide-x md:grid-cols-3">
                            <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                                <div>
                                <div>
                                    <h4 className="text-xl font-bold">Flavors</h4>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">
                                    Choose from a variety of unique flavors like red velvet, matcha, and salted caramel.
                                    </p>
                                </div>
                                </div>
                            </div>
                            <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                                <div>
                                <div>
                                    <h4 className="text-xl font-bold">Fillings</h4>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">
                                    Add a surprise inside with our delicious fillings like cream cheese, chocolate ganache, and fruit
                                    preserves.
                                    </p>
                                </div>
                                </div>
                            </div>
                            <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                                <div>
                                <div>
                                    <h4 className="text-xl font-bold">Decorations</h4>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">
                                    Make your cake stand out with our edible decorations, from fondant flowers to chocolate
                                    sculptures.
                                    </p>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </section>
                    <section className='flex align-middle items-center justify-center justify-items-center '>
                    <Link to='/custom'>
                        <p>
                            <h4 className=" bg-rose-500 bg-opacity-50 rounded-xl shadow-lg mt-4 p-5 px-8 text-lg font-bold">Customize Now</h4>
                        </p>
                    </Link>
                    </section>
                </div>
            </nav>
        </div>
    )
}

export default Home