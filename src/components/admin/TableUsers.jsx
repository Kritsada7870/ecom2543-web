import React, { useState, useEffect } from 'react'
import { getListAllUsers } from '../../api/admin'
import useEcomStore from '../../store/ecom-store'
import { changeUserStatus, changeUserRole } from '../../api/admin'
import { toast } from 'react-toastify'


const TableUsers = () => {
    const token = useEcomStore((state) => state.token)
    const [users, setUser] = useState([])

    useEffect(() => {
        handleGetUsers(token)
    }, [])

    const handleGetUsers = (token) => {
        getListAllUsers(token)
            .then((res) => {
                setUser(res.data)
            })
            .catch(err => console.log(err))
    }

    const handlChangeUserStatus = (userId, userStatus) => {
        console.log(userId, userStatus)
        const value = {
            id: userId,
            enabled: !userStatus
        }
        changeUserStatus(token, value)
            .then((res) => {
                console.log(res)
                handleGetUsers(token)
                toast.success('Update Status Success!!')

            })
            .catch(err => console.log(err))
    }


    const handlChangeUserRole = (userId, userRole) => {
        // console.log(userId, userStatus)
        const value = {
            id: userId,
            role: userRole
        }
        changeUserRole(token, value)
            .then((res) => {
                console.log(res)
                handleGetUsers(token)
                toast.success('Update Role Success!!')
            })
            .catch(err => console.log(err))
    }


    console.log(users)
    return (
        <div className='container mx-auto p-4 bg-white shadow-md'>
            <table className='w-full'>

                <thead>
                    <tr>
                        <th>ลำดับ</th>
                        <th>Email</th>
                        {/* <th>วันที่แก้ไขล่าสุด</th> */}
                        <th>สิทธิ์</th>
                        <th>สถานะ</th>
                        <th>จัดการ</th>
                    </tr>
                </thead>


                <tbody>

                    {
                        users?.map((el, i) => (
                            <tr key={el.id}>
                                <td>{i + 1}</td>
                                <td>{el.email}</td>
                                {/* <td>{el.updatedAt}</td> */}



                                <td>
                                    <select
                                        onChange={(e) => handlChangeUserRole(el.id, e.target.value)}
                                        value={el.role}
                                    >
                                        <option>user</option>
                                        <option>admin</option>
                                    </select>

                                </td>





                                <td>
                                    {el.enabled ? 'Active' : 'Inactive'}
                                </td>
                                <td>
                                    <button
                                        className='bg-yellow-300 p-1 rounded-md shadow-md'
                                        onClick={() => handlChangeUserStatus(el.id, el.enabled)}

                                    >
                                        {el.enabled ? 'Disable' : 'Enable'}

                                    </button>
                                </td>
                            </tr>
                        ))}

                </tbody>
            </table>
        </div>
    )
}

export default TableUsers
