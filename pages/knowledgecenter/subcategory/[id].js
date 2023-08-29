import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const Subcategory = () => {
    const router = useRouter()
    const { id } = router.query
    const [subcategory,setSubcategory]=useState([])

    const getData =()=>{
        fetch("/api/filter/filter", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
        body: JSON.stringify({categoryName:id}),
        }).then((res) => { if (!res.ok) { throw new Error("Network response was not ok"); }
          return res.json(); // Parse the JSON data
        })
        .then((data) => { setSubcategory(data) })
        .catch((error) => {console.error("Error fetching or parsing data:", error);});
    }
  
    useEffect(() => {
        getData();
    }, [id]);

    return (
        <>
            <div className="px-20 mt-10">
                <div className="grid gap-6 mb-6 grid-cols-1 md:grid-cols-3">
                {subcategory.length==0 ? null :<>
                    {subcategory.map((data) => {
                    return <>
                    <div key={data.id} onClick={()=>router.push(`/knowledgecenter/${data.id}`)} className='cursor-pointer'><div className="grid2">
                    <div className="max-w-sm rounded-full bg-gradient-to-r from-[#4216AA] to-[#F8AF0B] hover:bg-gradient-to-l shadow-md">
                        <div className="p-5">
                            <h5 className="text-center text-white text-xl md:text-3xl font-semibold tracking-tight uppercase">{data.name}</h5>
                        </div>
                    </div>
                    </div></div>
                    </>
                    })}
                    </>
                    }
                    <div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Subcategory

