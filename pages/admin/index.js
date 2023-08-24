import { useRouter } from 'next/router';
import React,{useState,useEffect} from 'react'
import PrivateRoute from '../../PrivateRoute/PrivateRoute';
import Link from 'next/link';

const Url = () => {
    const router = useRouter();
    const [contact,setContact]=useState()
    
    const deleteContacts = (id) => {
        fetch("/api/property/delete-property", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id }),
        }).then(() => {
            getCategotyData()
            alert("delete Succfully")
        });
    }; 
    
    // const statsContacts = (data,status) => {
    //     fetch("/api/property/status-property", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ data: data , status: status }),
    //     }).then(() => {
    //         getCategotyData()
    //         alert("delete Succfully")
    //     });
    // };

    const getCategotyData = ()=>{
        fetch("/api/property/get-property", { 
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => {return res.json()}
          ).then((res) => setContact(res))
    }

    useEffect(() => {
        getCategotyData();
    }, [])
    return (
        <>
           <div className="w-screen">
                <div className="mx-auto grid max-w-screen-lg px-6 pb-20">
                    <div className>
                        <p className="mt-8 font-serif text-xl font-bold text-blue-900">Select a date</p>
                        <div className="relative mt-4 w-56">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg aria-hidden="true" className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillrule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" cliprule="evenodd" /></svg>
                            </div>
                            <input autofocus="autofocus" type="date" className="datepicker-input block w-full rounded-lg border border-emerald-300 bg-emerald-50 p-2.5 pl-10 text-emerald-800 outline-none ring-opacity-30 placeholder:text-emerald-800 focus:ring focus:ring-emerald-300 sm:text-sm" placeholder="Select date" />
                        </div>
                    </div>
                    <div className>
                        <p className="mt-8 font-serif text-xl font-bold text-blue-900">Select a time</p>
                        <div className="mt-4 grid grid-cols-4 gap-2 lg:max-w-xl">
                            <button className="rounded-lg bg-emerald-100 px-4 py-2 font-medium text-emerald-900 active:scale-95">12:00</button>
                            <button className="rounded-lg bg-emerald-100 px-4 py-2 font-medium text-emerald-900 active:scale-95">14:00</button>
                            <button className="rounded-lg bg-emerald-700 px-4 py-2 font-medium text-white active:scale-95">09:00</button>
                            <button className="rounded-lg bg-emerald-100 px-4 py-2 font-medium text-emerald-900 active:scale-95">12:00</button>
                            <button className="rounded-lg bg-emerald-100 px-4 py-2 font-medium text-emerald-900 active:scale-95">15:00</button>
                            <button className="rounded-lg bg-emerald-100 px-4 py-2 font-medium text-emerald-900 active:scale-95">12:00</button>
                            <button className="rounded-lg bg-emerald-100 px-4 py-2 font-medium text-emerald-900 active:scale-95">14:00</button>
                            <button className="rounded-lg bg-emerald-100 px-4 py-2 font-medium text-emerald-900 active:scale-95">12:00</button>
                        </div>
                    </div>
                    <button className="mt-8 w-56 rounded-full border-8 border-emerald-500 bg-emerald-600 px-10 py-4 text-lg font-bold text-white transition hover:translate-y-1">Book Now</button>
                </div>
            </div>

        </>
    )
}

export default PrivateRoute(Url)