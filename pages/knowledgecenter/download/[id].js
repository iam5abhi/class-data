import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
// import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import FileSaver from 'file-saver';

const Download = () => {
    const router = useRouter()
    const {id} = router.query
    const [subcategory,setSubcategory]=useState()

    const saveManual = () => {
      if (window) {
        FileSaver.saveAs(!subcategory ? null : subcategory.file, !subcategory ? null : subcategory.title);
    }
    };

    const GetSingleData =()=>{
        fetch("/api/upload/get-singleupload", {
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
        {/* <DocViewer
          pluginRenderers={DocViewerRenderers}
          documents={[ { uri:!subcategory?null:subcategory.file } ]}
          style={{ height: 450 }}
        /> */}
        {typeof window !== 'undefined' && (
            <div className='mt-5'>
                <button
                    type='button'
                    onClick={saveManual}
                    className="inline-flex items-center px-10 py-4 bg-red-600 hover:bg-red-700 text-white text-lg font-medium rounded-md"
                >
                    <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                    </svg>
                    Download Now
                </button>
            </div>
        )}
    </div>
  )
}

export default Download