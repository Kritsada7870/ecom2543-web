
import React, { useEffect, useState } from 'react'
import { changeOrderStatus, getOrderAdmin } from '../../api/admin'
import useEcomStore from '../../store/ecom-store'
import { toast } from "react-toastify";
import { numberFormat } from '../../utils/number';
import { dateFormat } from '../../utils/dateformat';


const TableOrders = () => {
    const token = useEcomStore((state) => state.token)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        handleGetOrder(token)
    }, [])

    const handleGetOrder = (token) => {
        getOrderAdmin(token)
            .then((res) => {
                setOrders(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    const handleChangeOrderStatus = (token, orderId, orderStatus) => {
        console.log(orderId, orderStatus)
        changeOrderStatus(token, orderId, orderStatus)
            .then((res) => {
                console.log(res)
                toast.success('Update Status Success!!!')
                handleGetOrder(token)
            })
            .catch((err) => {
                console.log(err)
            })

    }

    const getStatusColor = (status) => {
        switch (status) {
            case "Not Process":
                return "bg-gray-200";
            case "Processing":
                return "bg-blue-200";
            case "Completed":
                return "bg-green-200";
            case "Cancelled":
                return "bg-red-200";

        }
    }



    return (
        <div className='container mx-auto p-4 bg-white shadow-md'>
            <div>
                <table className='w-full'>
                    <thead>
                        <tr className='bg-gray-200 border'>
                            <th>ลำดับ</th>
                            <th>ชื่อผู้ใช้งาน</th>
                            <th>วันที่</th>
                            <th>ที่อยู่</th>
                            <th>สินค้า</th>
                            <th>รวม</th>
                            <th>สถานะ</th>
                            <th>จัดการ</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            orders?.map((item, index) => {
                                console.log(item)

                                return (
                                    <tr key={index} className='border'>

                                        {/* ลำดับ */}
                                        <td className='text-center'>
                                            {index + 1}
                                        </td>

                                        {/* ชื่อผู้ใช้งาน */}
                                        <td>
                                            <p>
                                                {item.orderedBy.email}
                                            </p>
                                        </td>

                                        {/* วันที่ */}
                                        <td>
                                            <p>
                                                {dateFormat(item.createdAt)}
                                            </p>
                                        </td>


                                        {/* ที่อยู่ */}
                                        <td>
                                            <p>
                                                {item.orderedBy.address}
                                            </p>
                                        </td>

                                        {/* สินค้า */}
                                        <td>
                                            {
                                                item.products?.map((product, index) => (
                                                    <div key={index} className='mb-2'>
                                                        <li>
                                                            {product.product.title}
                                                            <span className='text-sm ml-2 '>
                                                                {product.count} x {numberFormat(product.product.price)}
                                                            </span>
                                                        </li>
                                                    </div>
                                                ))
                                            }
                                        </td>

                                        {/* รวม */}
                                        <td className='text-center'>
                                            {numberFormat(item.cartTotal)}
                                        </td>

                                        {/* สถานะ */}
                                        <td className='text-center'>
                                            <span className={`${getStatusColor(item.orderStatus)} px-2 py-1 rounded-full`}>
                                                {item.orderStatus}
                                            </span>

                                        </td>

                                        {/* จัดการ */}
                                        <td className='text-center'>
                                            <select
                                                value={item.orderStatus}
                                                onChange={(e) => handleChangeOrderStatus(token, item.id, e.target.value)}
                                            >
                                                <option>Not Process</option>
                                                <option>Processing</option>
                                                <option>Completed</option>
                                                <option>Cancelled</option>
                                            </select>
                                        </td>

                                    </tr>
                                )
                            })
                        }
                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default TableOrders

