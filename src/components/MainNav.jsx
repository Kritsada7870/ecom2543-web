
import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useEcomStore from '../store/ecom-store'
import { Menu } from 'lucide-react';
const MainNav = () => {
    const carts = useEcomStore((s) => s.carts)
    const user = useEcomStore(s => s.user)
    const logout = useEcomStore(s => s.logout)
    const [isOpen, setIsOpen] = useState(false)
    // console.log(Boolean(user))
    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    console.log(carts.length)
    return (
        <nav className='bg-slate-800 shadow-md'>
            <div className='mx-auto px-4'>
                <div className='flex justify-between h-16'>
                    <div className='flex items-center gap-6'>
                        <Link to={'/'} className='text-2xl font-bold text-cyan-400'>Blue Shop</Link>
                        <NavLink className={({ isActive }) =>
                            isActive
                                ? 'bg-cyan-500 text-white px-3 py-2 rounded-md text-sm font-medium'
                                : 'text-white hover:bg-slate-600 px-3 py-2 rounded-md text-sm font-medium'
                        }
                            to={'/'} >
                            Home</NavLink>





                        <NavLink className={({ isActive }) =>
                            isActive
                                ? 'bg-cyan-500 text-white px-3 py-2 rounded-md text-sm font-medium'
                                : 'text-white hover:bg-slate-600 px-3 py-2 rounded-md text-sm font-medium'
                        }


                            to={'/shop'}>Shop</NavLink>
                        {/* Badge */}





                        <NavLink className={({ isActive }) =>
                            isActive
                                ? 'bg-cyan-500 text-white px-3 py-2 rounded-md text-sm font-medium'
                                : 'text-white hover:bg-slate-600 px-3 py-2 rounded-md text-sm font-medium'
                        }


                            to={'/cart'}>Cart
                            {
                                carts.length > 0 && (<span className='absolute top-0 
                                 bg-red-500 text-white rounded-full px-2'>{carts.length}</span>
                                )
                            }
                        </NavLink>
                    </div>


                    {
                        user
                            ? <div className='flex items-center gap-4'>
                                <button
                                    onClick={toggleDropdown}
                                    className='flex items-center gap-2 text-white hover:bg-slate-600 px-2 py-3 rounded-md'>
                                    <img
                                        className='w-9 h-8'
                                        src='https://cdn.iconscout.com/icon/free/png-512/free-avatar-icon-svg-download-png-840229.png?f=webp&w=512' />

                                    <Menu />
                                </button>

                                {
                                    isOpen &&
                                    <div className='absolute top-16 shadow-md bg-white z-50'>
                                        <Link
                                            to={'/user/history'}
                                            className='block px-4 py-2 hover:bg-gray-300'>
                                            History
                                        </Link>
                                        <button
                                            onClick={() => logout()}
                                            className='block px-4 py-2 hover:bg-gray-300'>
                                            Logout
                                        </button>
                                    </div>
                                }


                            </div>


                            : <div className='flex items-center gap-4'>
                                <NavLink className={({ isActive }) =>
                                    isActive
                                        ? 'bg-cyan-500 text-white px-3 py-2 rounded-md text-sm font-medium'
                                        : 'text-white hover:bg-slate-600 px-3 py-2 rounded-md text-sm font-medium'
                                }


                                    to={'/register'}>Register</NavLink>




                                <NavLink className={({ isActive }) =>
                                    isActive
                                        ? 'bg-cyan-500 text-white px-3 py-2 rounded-md text-sm font-medium'
                                        : 'text-white hover:bg-slate-600 px-3 py-2 rounded-md text-sm font-medium'
                                }


                                    to={'/login'}>Login</NavLink>
                            </div>


                    }


                </div>

            </div>
        </nav>
    )
}

export default MainNav


//flex เป้นการจัดแนวนอน
//่justify-between เป็นการแยกออกจากกัน
//h-16 การปรับความสูง
//bg- คือสี
//item-center ปรับให้อยู่ตรงกลาง gap-4 คือระยะห่างของแต่ละ item

