import React from 'react'
import { NavLink } from 'react-router-dom'
import {
    LayoutDashboard,
    FolderKanban,
    ChartBarStacked,
    ShoppingCart,
    CalendarArrowDown,
    LogOut
} from 'lucide-react'

const SidebarAdmin = () => {
    return (

        <div className="bg-teal-950 w-64 text-gray-100 flex flex-col h-screen">

            {/* ================= HEADER ================= */}

            <div className="h-24 bg-slate-950 flex items-center justify-center text-2xl font-bold">
                Admin Panel
            </div>


            {/* ================= MENU ================= */}

            <nav className="flex-1 px-4 py-4 space-y-2">


                {/* Dashboard */}

                <NavLink
                    to="/admin"
                    end
                    className={({ isActive }) =>
                        isActive
                            ? "bg-teal-600 rounded-md text-white px-4 py-2 flex items-center"
                            : "text-teal-200 px-4 py-2 hover:bg-teal-800 hover:text-cyan-300 rounded flex items-center"
                    }
                >

                    <LayoutDashboard className="mr-2" />

                    Dashboard

                </NavLink>


                {/* Manage */}

                <NavLink
                    to="manage"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-teal-600 rounded-md text-white px-4 py-2 flex items-center"
                            : "text-teal-200 px-4 py-2 hover:bg-teal-800 hover:text-cyan-300 rounded flex items-center"
                    }
                >

                    <FolderKanban className="mr-2" />

                    Manage

                </NavLink>


                {/* Category */}

                <NavLink
                    to="category"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-teal-600 rounded-md text-white px-4 py-2 flex items-center"
                            : "text-teal-200 px-4 py-2 hover:bg-teal-800 hover:text-cyan-300 rounded flex items-center"
                    }
                >

                    <ChartBarStacked className="mr-2" />

                    Category

                </NavLink>


                {/* Product */}

                <NavLink
                    to="product"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-teal-600 rounded-md text-white px-4 py-2 flex items-center"
                            : "text-teal-200 px-4 py-2 hover:bg-teal-800 hover:text-cyan-300 rounded flex items-center"
                    }
                >

                    <ShoppingCart className="mr-2" />

                    Product

                </NavLink>


                {/* Orders */}

                <NavLink
                    to="orders"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-teal-600 rounded-md text-white px-4 py-2 flex items-center"
                            : "text-teal-200 px-4 py-2 hover:bg-teal-800 hover:text-cyan-300 rounded flex items-center"
                    }
                >

                    <CalendarArrowDown className="mr-2" />

                    Orders

                </NavLink>

            </nav>


            {/* ================= LOGOUT ================= */}

            <div className="pb-4 px-4">

                <a
                    href="https://ecom2543-web.vercel.app/"
                    className="text-teal-200 px-4 py-2 hover:bg-teal-800 hover:text-cyan-300 rounded flex items-center"
                >

                    <LogOut className="mr-2" />

                    LogOut

                </a>

            </div>

        </div>
    )
}

export default SidebarAdmin