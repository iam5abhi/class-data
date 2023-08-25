import React, { useEffect, useState } from 'react';
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Head from 'next/head';


export default function UploadFile ({setOpen,open,getCategotyData}) {
  const cancelButtonRef = useRef(null)
  const [subcategory,setSubcategory]=useState([])
  const [formData,setFormData]=useState({subcategory:'',file:'',title:'',uploadType:''})


  const OnChangeHandler=(event)=>{
    setFormData((pre)=>({
      ...pre,
      [event.target.name]:event.target.value
    }))
  }

  const openupWidget = () => {
    cloudinary.createUploadWidget(
      {
        cloud_name: "fatimaola",
        upload_preset: "ufa6exrd",
        multiple: true, // Allow multiple image uploads
      },
      (error, results) => {
        if (!error && results && results.event === "success") {
          // Assuming results.info contains the uploaded image information
          const imageUrl = results.info.url;
          // Update projectPhotos with the new image URL
            setFormData({...formData,file:imageUrl});
        }
      }
    ).open();
  };

  const handleSubmit =(event)=>{
      event.preventDefault();
      fetch("/api/upload/add-upload", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
      body: JSON.stringify(formData),
      }).then((res) => {
         setOpen(false) 
         getCategotyData()
      })
  }

  const getContactData = () => {
    fetch("/api/subcategory/get-subcategory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => { if (!res.ok) { throw new Error("Network response was not ok"); }
        return res.json(); // Parse the JSON data
      })
      .then((data) => { setSubcategory(data)})
      .catch((error) => {console.error("Error fetching or parsing data:", error);});
  };

  useEffect(() => {
    getContactData();
  }, []);

  return (
    <>
    <Head>
        <script
        src='https://upload-widget.cloudinary.com/global/all.js'
        type='text/javascript'
        />
    </Head>    
    <Transition.Root show={open} as={Fragment}>   
    <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </Transition.Child>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex md:min-h-full mt-36 md:mt-0 items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <Dialog.Panel className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 w-full md:max-w-xl">
            <div className="max-w-screen mx-auto">
              <div className="container mx-auto">
                <div className="col-span-2">
                  <div className=" border-b border-gray-200 rounded">
                      <div className="text-end p-2">
                        <i onClick={() => setOpen(false)} className="fa-solid fa-xmark text-xs font-extrabold bg-gray-400 h-5 leading-5 w-5 z-50 rounded-full text-center text-white"></i>
                      </div>
                      <Dialog.Title as="h2" className=" text-xl text-center font-semibold">
                      Upload Form
                      </Dialog.Title> 
                    <div className="overflow-auto">
                    <div className="container w-11/15 mx-auto px-3 bg-white rounded  ">
                      <div className="relative flex flex-col flex-auto min-w-0 mt-2 p-4 break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border mb-4 draggable " draggable="true">
                        <form onSubmit={handleSubmit}>
                          <div className="mb-2">
                            <label
                              htmlFor="category"
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Select an Subcategory
                            </label>
                            <select
                              id="secondUrl"
                              name='subcategory'
                              value={formData.subcategory}
                              onChange={OnChangeHandler}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                              required
                            >
                              <option value="">Choose</option>
                              {subcategory.map(data=><option key={data.id} value={data.name}>{data.name}({data.categoryName})</option>)}
                            </select>
                          </div>
                          <div className='mb-4'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title <span class="text-red-600">*</span></label>
                            <input type="text" name='title' onChange={OnChangeHandler} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder='Enter Title' required/>
                          </div>
                          <div className="mb-4 flex gap-5">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">File Type <span class="text-red-600">*</span></label>
                            <div className="flex gap-1">
                                <input type="radio" id="name" name='uploadType' value="WORD" onChange={OnChangeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 " />
                                <label htmlfor="specialization" className="block text-sm font-medium text-gray-900 ">WORD</label>
                            </div>
                            <div className="flex gap-1">
                                <input type="radio" id="name" name='uploadType' value="PPT" onChange={OnChangeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 " />
                                <label htmlfor="specialization" className="block text-sm font-medium text-gray-900 ">PPT</label>
                            </div>
                            <div className="flex gap-1">
                                <input type="radio" id="name" name='uploadType' value="XLS" onChange={OnChangeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 " />
                                <label htmlfor="specialization" className="block text-sm font-medium text-gray-900 ">XLS</label>
                            </div>
                            <div className="flex gap-1">
                                <input type="radio" id="name" name='uploadType' value="PDF" onChange={OnChangeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 " />
                                <label htmlfor="specialization" className="block text-sm font-medium text-gray-900 ">PDF</label>
                            </div>
                          </div>
                          <div className='mb-5'>
                            <button
                            className='bg-gradient-to-r from-[#4216AA] to-[#F8AF0B] hover:bg-gradient-to-l text-white font-bold py-2 px-4 rounded'
                            type='button'
                            onClick={()=>openupWidget("ProjectPhotos")}
                            >
                            Upload File
                            </button>
                          </div>
                          <div className='grid justify-items-center mt-5'>
                            <button type="submit" className="text-white bg-gradient-to-r from-[#4216AA] to-[#F8AF0B] hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-6 py-2 text-center mr-3 md:mr-0">Submit</button>
                          </div>
                        </form>
                      </div>
                    </div>
              </div>
              </div>
            </div>
          </div>
         </div>
        </Dialog.Panel>
        </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition.Root>
  </>
  )
}
