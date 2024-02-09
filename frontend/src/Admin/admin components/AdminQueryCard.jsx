import React from 'react'
import "../admin css/AdminQueryCard.css"
export default function AdminQueryCard(props) {

  const handleClick = async(id) => {
    try{
      const response = await fetch(`http://localhost:8000/api/delete-query/${id}` , {
        method:'DELETE',
        headers:{
          'content-type' : 'application/json'
        }
      })
      const json = await response.json()
      if(json.success){
        alert("Query Deleted Successfulyy!!")
        window.location.reload()
      }
    }catch(err){
      console.log(err);
    }
  } 

  return (
    <div className='admin-query-card'>
        <h3>{props.name}</h3>
        <h5>{props.email}</h5>
        <h5>{props.phone}</h5>
        <p>{props.query}</p>
        <hr/>
        <h6>If Query Resolved !! </h6>
        <button className='btn-a logout-btn' onClick={() => {handleClick(props.id)}}>Delete Query</button>
    </div>
  )
}
