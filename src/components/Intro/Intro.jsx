import React from 'react'
import backfunc from '../../appwrite/website'
import ids from '../../ids/ids'
import v1 from './V1.mp4'

function Intro (){
    return(
        <div className='m-8 mt-2 p-6 bg-rose-300 bg-opacity-30 lg:flex font-a text-2xl bg-black-300 w-auto h-auto relative rounded-3xl overflow-hidden'>
            <video src={v1} autoPlay muted loop className='lg:mx-4  pr-4 w-auto lg:w-1/2 lg:mr-5 '/>
            <div className=' bg-rose-400 bg-opacity-50 p-2 rounded-b-3xl  lg:rounded-b-none lg:rounded-r-3xl text-blue-1000'>
            <p className=' text-xl pl-2  mt-4 '>At the heart of Cakelisious beats a fervent passion for the harmonious marriage of exceptional taste and stunning design. Our vision is to redefine the art of cake-making by infusing it with creativity, innovation, and an unbridled passion for perfection. From the very inception, our vision has been clear — to redefine the art of cake-making by infusing it with creativity, innovation, and an unbridled passion for perfection.
            </p>
            <p className=' text-xl pl-2 mt-4 mr-2 '>
            On our website, you'll find a curated gallery showcasing not only the diverse array of flavors but also the meticulous craftsmanship that goes into each cake. The customizable option is a testament to our dedication to making each cake a reflection of our customer's unique style and the spirit of their occasion. At Cakelisious, we don't just bake cakes; we craft edible works of art that leave a lasting impression, both on the palate and in memories. Welcome to a world where every slice is a celebration of taste, design, and the passion that drives us.
            </p>
            </div>
        </div>
    )
}

export default Intro