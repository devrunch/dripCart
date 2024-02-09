import React, { useState , useEffect} from 'react'
import "../css/page css/LoginPage.css"
import t_shirt from "../images/loginImage.png"
export default function LoginPage() {
  const[data , setData] = useState({email:""  ,password:""})


  const handleChange = (e) => {
    setData({...data , [e.target.name] : e.target.value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    try{
      const response = await fetch("http://localhost:8000/api/login" , {
        method:'POST',
        headers:{
          'content-type':'application/json'
        },
        body : JSON.stringify(data)
      })
      const json = await response.json()
      if(json.success){
        const token = json.token
        localStorage.setItem("token" , token)
        window.location.reload()
        window.location.href = "/"
      }
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className='login-page'>
      <form className="login-form" onSubmit={handleSubmit}>
        <h3>Login Yourself</h3>
        <div className="input-box">
            <p>Your Email Address</p>
            <input type="text" className="input-field" name='email' value={data.email} onChange={handleChange} required/>
        </div>
        <div className="input-box">
            <p>Enter Password</p>
            <input type="password" className="input-field" name='password' value={data.password} onChange={handleChange} required/>
        </div>
        <h6>Currently We Are not allowing registration of new users!! Sorry for inconvienience</h6>
        <input type="submit" value="Login" className="btn-a" />
      </form>
      <img src={t_shirt} alt="" />
    </div>
  )
}
