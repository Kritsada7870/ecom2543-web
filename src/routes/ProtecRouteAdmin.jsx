import React, { useState, useEffect } from 'react'
import useEcomStore from '../store/ecom-store'
import { currentAdmin } from '../api/auth'
import LoadingToRedirect from './LoadingToRedirect'


const ProtecRouteAdmin = ({ element }) => {
    const [ok, setok] = useState(false)
    const user = useEcomStore((state) => state.user)
    const token = useEcomStore((state) => state.token)


    useEffect(() => {
        if (user && token) {
            currentAdmin(token)
                .then((res) => setok(true)) // ถ้า currentUser ทำงานสำเร็จจะมาทำงานที่ then
                .catch((err) => setok(false)) // ถ้ามี error จะทำงานที่ catch
        }
    }, [])

    return   ok ? element: <LoadingToRedirect/>

}

export default ProtecRouteAdmin
