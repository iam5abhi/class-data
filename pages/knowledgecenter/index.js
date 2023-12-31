import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const KnowledgeCenter = () => {
    const router = useRouter()
    const [category,setCategory]=useState([])
  
    const getData = () => {
      fetch("/api/category/get-category", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => { if (!res.ok) { throw new Error("Network response was not ok"); }
          return res.json(); // Parse the JSON data
      }).then((data) => { setCategory(data)
      }).catch((error) => {console.error("Error fetching or parsing data:", error);});
    };
  
    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <div className="px-20 mt-10">
                <div className="grid gap-6 mb-6 grid-cols-1 md:grid-cols-3">
                {category.length==0 ? null :<>
                    {category.map((data) => {
                    return <>
                    <div key={data.id} onClick={()=>router.push(`/knowledgecenter/subcategory/${data.name}`)} className='cursor-pointer'><div className="grid2">
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

export default KnowledgeCenter