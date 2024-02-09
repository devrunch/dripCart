import React, { useEffect, useState } from 'react'
import "../admin css/AdminQueryPage.css"
import product from "../../images/query page header.png"
import AdminQueryCard from '../admin components/AdminQueryCard'
export default function AdminQueryPage() {
    const[data , setData] = useState([])
    useEffect(() => {
        const fetchData = async() => {
            const response = await fetch("http://localhost:8000/api/read-query" , {
                method:'GET',
                headers:{
                    'content-type' : 'application/json'
                }
            })
            const json = await response.json()
            if(json.success){
                setData(json.data)
            }
        }
        fetchData()
    } , [])
  return (
   <div className='admin-query-page'>
        <div className="admin-query-page-header">
            <div className="admin-query-page-header-left">
                <h1>Take Care of Your <br/><span>Customers</span></h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis eos, molestias, culpa facilis facere possimus fugiat minus deserunt corrupti beatae quos iure ducimus illo soluta unde sunt nostrum aliquam tempora.</p>
            </div>
            <div className="admin-query-page-header-right">
                <img src={product} alt="" />
            </div>
        </div>
        <div className="product-section-bottom">
            {data.map((elem) => (
                <AdminQueryCard name={elem.name} email={elem.email} phone={elem.contact} query={elem.query} key={elem._id} id={elem._id} />
            ))}
        </div>
   </div>
  )
}
