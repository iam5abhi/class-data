import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { auth, logout } from "../../components/firebase/index";
import { useAuthState } from "react-firebase-hooks/auth";

const Header = () => {
    const [user] = useAuthState(auth);
    return (
        <>
        <nav className="bg-white border-gray-200 shadow">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center">
                    <span className="self-center font-semibold whitespace-nowrap ">LOGO</span> {/* <img src="" className='h-8' /> */}
                </Link>
                    <div className="flex md:order-2">
                        <Link href="/knowledgecenter" className="mr-5 flex items-center">
                            <span className="self-center font-semibold whitespace-nowrap ">Knowledge Center</span>
                        </Link>
                        {!user ? null :<>
                        <button type="button" onClick={() => logout()} className="text-white bg-gradient-to-r from-[#4216AA] to-[#F8AF0B] hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-6 py-2 text-center mr-3 md:mr-0">Logout</button>
                        <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="navbar-cta" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                        </>}
                    </div>
                <div className="items-center justify-between w-full md:flex md:w-auto md:order-1 hidden" id="navbar-cta">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 ">
                    {!user ? null : <>
                        <li>
                            <Link href="/admin" className="block py-2 pl-3 pr-4 text-violet-950  rounded md:bg-transparent md:p-0 " aria-current="page">Home</Link>
                        </li>
                        <li>
                            <Link href="/admin/category" className="block py-2 pl-3 pr-4 text-violet-950  rounded md:bg-transparent md:p-0 " aria-current="page">Category</Link>
                        </li>
                        <li>
                            <Link href="/admin/subcategory" className="block py-2 pl-3 pr-4 text-violet-950  rounded md:bg-transparent md:p-0 " aria-current="page">Subcategory</Link>
                        </li>
                        <li>
                            <Link href="/admin/change-password" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-violet-950 md:p-0  ">Change Password</Link>
                        </li>
                        </>
                    }   
                    {/* <div className="group inline-block relative">
                        <button className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
                            <span className="mr-1">Dropdown</span>
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </button>
                        <ul className="absolute hidden text-gray-700 pt-1 group-hover:block">
                            <li className>
                            <a className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">One</a>
                            </li>
                            <li className>
                            <a className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">Two</a>
                            </li>
                            <li className>
                            <a className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">Three is the magic number</a>
                            </li>
                        </ul>
                    </div> */}
                    <li>
                        <Link href="/knowledgecenter" className="block py-2 pl-3 pr-4 text-violet-950  rounded md:bg-transparent md:p-0 " aria-current="page">Knowledge Center</Link>
                    </li> 
                    </ul>
                </div>
            </div>
        </nav>
        </>
    )
}

export default Header