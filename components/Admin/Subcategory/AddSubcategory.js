import React, { useState, useEffect, memo } from 'react';
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'


function AddSubcategory ({setOpen,open,getQueriesData}) {
  const cancelButtonRef = useRef(null)
  const [category,setCategory]=useState([])
  const [formData,setFormData]=useState({categoryName:'',name:'',aboutFirst:'',aboutSecond:''})

  const OnChangeHandler=(event)=>{
    setFormData((pre)=>({
      ...pre,
      [event.target.name]:event.target.value
    }))
  }

  const handleSubmit =(event)=>{
      event.preventDefault();
      fetch("/api/subcategory/add-subcategory", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
      body: JSON.stringify(formData),
      }).then((res) => {
        getQueriesData() 
        setOpen(false)
      })
  }

  const getCategoryData = ()=>{
    fetch("/api/category/get-category", { 
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {return res.json()}
      ).then((res) => setCategory(res))
}

useEffect(() => {
  getCategoryData();
}, [])

  return (
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
                      Query Form
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
                                Select an option
                              </label>
                              <select
                                id="secondUrl"
                                name='categoryName'
                                onChange={OnChangeHandler}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required
                              >
                                <option value="">Choose</option>
                                {category.map(data=><option key={data.name} value={data.name}>{data.name}</option>)}
                              </select>
                            </div>
                            <div className="mb-2">
                              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name <span class="text-red-600">*</span></label>
                              <input type="text" name='name' onChange={OnChangeHandler} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder='Enter Name' required/>
                            </div>
                            <div className="mb-2">
                              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">About <span class="text-red-600">*</span></label>
                              <textarea type="text" name='aboutFirst' onChange={OnChangeHandler} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder='Enter Name' required/>
                            </div>
                            <div >
                              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">About <span class="text-red-600">*</span></label>
                              <textarea type="text" name='aboutSecond' onChange={OnChangeHandler} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder='Enter Name' required/>
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
  )
}
export default memo(AddSubcategory)
