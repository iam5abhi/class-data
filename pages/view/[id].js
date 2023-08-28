import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const ViewProject = () => {
    const router = useRouter()
    const {id} = router.query
    const [subcategory,setSubcategory]=useState({})

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

    useEffect(() => {
        GetSingleData();
    }, [id]);

  return (
    <div className='text-center'>
        <div className='text-5xl font-bold mt-5'>
            {subcategory.name}({subcategory.categoryName})
        </div>
        <div className='mt-5'>
            <div className='font-semibold text-xl'>About:</div>
            {subcategory.aboutFirst}
        </div>
        <div className='mt-5'>
            <div className='font-semibold text-xl'>Download</div>
           <div onClick={()=>router.push(`/view/download/${id}`)} className='text-blue-600 cursor-pointer'>Download Now</div>
        </div>
        <div className='mt-5'>
            <div  className='font-semibold text-xl'>About:</div>
            {subcategory.aboutSecond}
        </div>
    </div>
  )
}

export default ViewProject