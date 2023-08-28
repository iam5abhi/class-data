import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const ViewProject = () => {
    const router = useRouter()
    const {id} = router.query
    const [subcategory,setSubcategory]=useState()
    const [project,setProject]=useState([])

    const GetSingleData =()=>{
        fetch("/api/subcategory/get-singlesubcategory", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
        body: JSON.stringify({id:id}),
        }).then((res) => { if (!res.ok) { throw new Error("Network response was not ok"); }
          return res.json(); // Parse the JSON data
        })
        .then((data) => { setSubcategory(data) })
        .catch((error) => {console.error("Error fetching or parsing data:", error);});
    }

    const GetProjectData =()=>{
        fetch("/api/upload/get-upload", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
        body: JSON.stringify({id:id}),
        }).then((res) => { if (!res.ok) { throw new Error("Network response was not ok"); }
          return res.json(); // Parse the JSON data
        })
        .then((data) => { setProject(data) })
        .catch((error) => {console.error("Error fetching or parsing data:", error);});
    }

    useEffect(() => {
        GetSingleData();
        GetProjectData();
    }, [id]);

  return (
    <div className='text-center'>
        <div className='text-5xl font-bold mt-5'>
            {!subcategory?null:subcategory.name}({!subcategory?null:subcategory.categoryName})
        </div>
        <div className='mt-5'>
            <div className='font-semibold text-xl'>About:</div>
            {!subcategory?null:subcategory.aboutFirst}
        </div>
        <div className="container mx-auto px-4 sm:px-8">
            <div className="py-4">
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                        <table className="min-w-full m leading-normal ">
                            <thead>
                                <tr>
                                    <th className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                       Title
                                    </th>
                                    <th className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        File Type
                                    </th>
                                    <th className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                       View File
                                    </th>
                                     
                                </tr>
                            </thead>
                            <tbody>
                                 {!project?"loading....":project.map((data,index)=>{
                                    return <tr key={index+1}>
                                    <td className="text-center px-5 py-5 bg-white text-sm">
                                        {data.title}  
                                    </td>
                                    <td className="text-center px-5 py-5 bg-white text-sm">
                                        {data.uploadType}  
                                    </td>
                                    <td className="text-center px-5 py-5 bg-white text-sm">
                                       <button type='button' onClick={()=>router.push(`/knowledgecenter/download/${data.id}`)} className="text-blue-600" >View Link</button> 
                                    </td>
                                </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div className='mt-5'>
            <div  className='font-semibold text-xl'>About:</div>
            {!subcategory?null:subcategory.aboutSecond}
        </div>
    </div>
  )
}

export default ViewProject