import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const KnowledgeCenter = () => {
    const router = useRouter()
    const [category,setCategory]=useState([])
    const [subcategory,setSubcategory]=useState([])

    const OnChangeHandler =(event)=>{
        fetch("/api/filter/filter", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
        body: JSON.stringify({categoryName:event.target.value}),
        }).then((res) => { if (!res.ok) { throw new Error("Network response was not ok"); }
          return res.json(); // Parse the JSON data
        })
        .then((data) => { setSubcategory(data) })
        .catch((error) => {console.error("Error fetching or parsing data:", error);});
    }
  
    const getData = () => {
      fetch("/api/category/get-category", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => { if (!res.ok) { throw new Error("Network response was not ok"); }
          return res.json(); // Parse the JSON data
        })
        .then((data) => { setCategory(data)})
        .catch((error) => {console.error("Error fetching or parsing data:", error);});
    };
  
    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <div className="mb-2 px-20">
                <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900"
                >
                    Select an Category
                </label>
                <select
                    id="secondUrl"
                    name='subcategory'
                    onChange={OnChangeHandler}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                >
                    <option value="">Choose</option>
                    {category.map(data=><option key={data.id} value={data.name}>{data.name}({data.categoryName})</option>)}
                </select>
            </div>
            <div className='grid grid-cols-4 px-20 mt-6' >
                {subcategory.map((data)=>{
                    return <div key={data.id} onClick={()=>router.push(`/knowledgecenter/${data.id}`)} className='cursor-pointer shadow border text-center py-10'>{data.name}</div>
                })}
            </div>
        </>
    )
}

export default KnowledgeCenter