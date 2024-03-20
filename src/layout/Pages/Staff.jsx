import React, { useEffect, useState } from 'react';
import { server } from '../..';
import axios from 'axios';
import AddStaff from '../components/AddStaff';

const Staff = () => {
    const [showModal, setShowModal] = useState(false)
    const [data, setData] = useState(null)



    async function fetchDetails() {
        await axios.get(`${server}/api/v1/view/staffDetails`, {
            withCredentials: true,
        }).then((res) => {
            if (res?.data?.success === true) {
                setData(res?.data?.staff)
            }
            console.log(res)
        }).catch((error) => {
            console.log(error)
        })
    }

    async function deleteStaff(id, value) {

        await axios.delete(`${server}/api/v1/data/delete-staff/${id}`).then((res) => {
            if (res?.data?.success === true) {
                fetchDetails()
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        fetchDetails()
    }, [])
    return (
        <div className='px-8 pt-5'>
            <p className='uppercase font-semibold text-xl'>Staff</p>

            {
                showModal === true ?
                    <AddStaff setShowModal={setShowModal} fetchDetails={fetchDetails} />
                    : <>
                        <button className='py-2 px-3 border-[1px] border-green-600 text-green-600 rounded-md my-4 text-sm font-semibold flex justify-center items-center hover:bg-green-500 hover:text-white shadow-md' onClick={() => {
                            setShowModal(true)
                        }}>Add Staff</button>

                        <>
                            <div className="flex flex-col">
                                <div className="-m-1.5 overflow-x-auto">
                                    <div className="p-1.5 min-w-full inline-block align-middle">
                                        <div className="overflow-hidden">
                                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border-[1px] border-gray-300 rounded-md">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">ID</th>
                                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Name</th>
                                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Email</th>
                                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Phone no</th>
                                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Role</th>
                                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Department</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        data?.map((ele, index) => {
                                                            return <tr className="odd:bg-white even:bg-gray-100 dark:odd:bg-slate-900 dark:even:bg-slate-800">
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{ele?.ID}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{ele?.Name}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{ele?.Email}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{ele?.Phone_Number}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{ele?.Role}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{ele?.Department}</td>
                                                                <td className='px-6 py-4'>
                                                                    <button class="font-medium text-green-600 dark:text-green-500 hover:underline" onClick={() => {
                                                                        deleteStaff(ele?.ID)
                                                                    }}>Delete</button>
                                                                </td>
                                                            </tr>
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </>
                    </>
            }
        </div>
    )
}

export default Staff

