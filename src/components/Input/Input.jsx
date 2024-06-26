import React, {useId} from 'react'

const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref){
    const id = useId()
    return (
        <div className='w-full  m-4 '>
            <label 
            className='inline-block m-4 p-4' 
            htmlFor={id}>
                {label}
            </label>
            <input type={type} className={`px-3 py-2 rounded-lg  bg-pink-100 text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} ref={ref} {...props} id={id}/>
        </div>
    )
})

export default Input