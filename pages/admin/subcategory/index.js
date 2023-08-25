import { useRouter } from 'next/router';
import React,{useState,useEffect} from 'react'
import PrivateRoute from '../../../PrivateRoute/PrivateRoute';
import AddSubcategory from '../../../components/Admin/Subcategory/AddSubcategory';
import UpdateSubcategory from '../../../components/Admin/Subcategory/UpdateSubcategory';

const Subcategory = () => {
    const [queries,setQueries]=useState([])
    const [subOpen,setSubOpen]=useState(false)
    const [updateOpen,setUpdateOpen]=useState(false)
    const [ids,setIds]=useState('')

    const UpdateHandler =(id)=>{
        setUpdateOpen(true);
        setIds(id);
    }

    const DeleteHandler =(id)=>{
        fetch("/api/subcategory/delete-subcategory", { 
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          body: JSON.stringify({ id: id }),
          }).then(() =>{
            alert('Delete Successfully')
            getQueriesData()
          }).catch((error) => alert(error))
    }

    const SearchHandler = async (event)=>{
        const query = event.target.value.toLowerCase();
        if (query === '') {
            getQueriesData();
        } else {
            const filteredList = queries.filter((item) => {
                const projectNameMatch = item.ProjectName.toLowerCase().includes(query);
                const phoneNumberMatch = item.phoneNumber.toLowerCase().includes(query);
                const statusMatch = item.status.toLowerCase().includes(query);

                return projectNameMatch || phoneNumberMatch || statusMatch;
            });
            setQueries(filteredList);
        }
    }

    const getQueriesData = ()=>{
        fetch("/api/subcategory/get-subcategory", { 
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => {return res.json()}
          ).then((res) => setQueries(res))
    }

    useEffect(() => {
        getQueriesData();
    }, [])
    return (
        <>
           <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
                <div className='px-2 flex justify-between'>
                    <h2 className="text-2xl font-semibold leading-tight">Subcategory</h2>
                    <div className='flex gap-2'>
                        <input type="text" name='email' onChange={SearchHandler} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1" placeholder='Search' />
                        <h2 onClick={()=>setSubOpen(true)} className="cursor-pointer text-lg font-semibold  leading-tight bg-gradient-to-r from-[#4216AA] to-[#F8AF0B] hover:bg-gradient-to-l shadow-md text-white rounded-full shadow px-5 py-1">Add Subcategory</h2>
                    </div>
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                        <table className="min-w-full m leading-normal ">
                            <thead>
                                <tr>
                                    <th className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                       Category Name
                                    </th>
                                    <th className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                         Status
                                    </th>
                                    <th className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Actions
                                    </th> 
                                </tr>
                            </thead>
                            <tbody>
                                {!queries?"loading....":queries.map((data,index)=>{
                                    return <tr key={index+1}>
                                    <td className="text-center px-5 py-5 bg-white text-sm">
                                        {data.categoryName}  
                                    </td>
                                    <td className="text-center px-5 py-5 bg-white text-sm">
                                        {data.name}  
                                    </td>
                                    <td className="text-center px-5 py-5 bg-white text-sm">                                                                                                                                            
                                        <span className={`mr-3 cursor-pointer relative inline-block px-3 py-1 font-semibold ${data.status=="newlead"?"text-green-900":data.status=="inprogress"?"text-yellow-900":data.status=="converted"?"text-purple-900":data.status=="onhold"?"text-blue-900":"text-red-900"} leading-tight`}>
                                            <span aria-hidden className={`absolute inset-0 opacity-50 rounded-full ${data.status=="newlead"?"bg-green-200":data.status=="inprogress"?"bg-yellow-200":data.status=="converted"?"bg-purple-200":data.status=="onhold"?"bg-blue-200":"bg-red-200"}`} />
                                            <span className="relative">{data.status}</span>
                                        </span>
                                    </td>  
                                    <td className="text-center px-5 py-5 bg-white text-sm">
                                        <span onClick={()=>UpdateHandler(data.id)} className="mr-3 cursor-pointer relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight">
                                            <span aria-hidden className="absolute inset-0 bg-yellow-200 opacity-50 rounded-full" />
                                            <span className="relative">Update</span>
                                        </span>
                                        <span onClick={()=>DeleteHandler(data.id)} className="mr-3 cursor-pointer relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                                            <span aria-hidden className="absolute inset-0 bg-red-200 opacity-50 rounded-full" />
                                            <span className="relative">Delete</span>
                                        </span>
                                    </td> 
                                </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <AddSubcategory setOpen={setSubOpen} open={subOpen} getQueriesData={getQueriesData} />
        <UpdateSubcategory setOpen={setUpdateOpen} open={updateOpen} id={ids} getQueriesData={getQueriesData} />
        </>
    )
}

export default PrivateRoute(Subcategory)