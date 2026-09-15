import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
const LoadingToRedirect = () => {

    const [count, setCount] = useState(10)  //คือ การดีเลย์ ในการ Login
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {  //ประการตัวแปร interval
        const interval = setInterval(() => {   //setInterval จะทำงานในทุกๆ 1000= 1 วินาที
            setCount((currentCount) => {
                if (currentCount === 1) {
                    clearInterval(interval)
                    setRedirect(true)
                }
                return currentCount - 1
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    if(redirect){
        return <Navigate to={'/'}/>
    }

    return (
        <div>
           No Permission, Redirect in {count}
        </div>
    )
}

export default LoadingToRedirect
