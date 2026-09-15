import React, { useState, useEffect } from 'react'
import useEcomStore from '../store/ecom-store'
import { currentUser } from '../api/auth'
import LoadingToRedirect from './LoadingToRedirect'


const ProtecRouteUser = ({ element }) => {
    const [ok, setok] = useState(false)
    const user = useEcomStore((state) => state.user)
    const token = useEcomStore((state) => state.token)


    useEffect(() => {
        if (user && token) {
            currentUser(token)
                .then((res) => setok(true)) // ถ้า currentUser ทำงานสำเร็จจะมาทำงานที่ then
                .catch((err) => setok(false)) // ถ้ามี error จะทำงานที่ catch
        }
    }, [])

    return   ok ? element: <LoadingToRedirect/>

}

export default ProtecRouteUser
