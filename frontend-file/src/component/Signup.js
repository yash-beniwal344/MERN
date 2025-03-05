import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name,setname]= useState('');
    const [email,setemail]= useState('');
    const [password,setpassword]= useState('');

    const navigate = useNavigate()


  
    useEffect(()=>{
      const auth = localStorage.getItem('user');
    if(auth){
      navigate('/product')
    }
    })
    const namechange = (e)=>{
        setname(e.target.value)
    }
    const emailchange = (e)=>{
        setemail(e.target.value)
    }
    const passwordchange = (e)=>{
        setpassword(e.target.value)
    }

    const buttonclick = async()=>{
   
        axios({
            method:'post',
            url:`http://localhost:2345/${process.env.REACT_APP_signup_api}`,
            data:{
                name:name,
                email:email,
                password:password
            }
        })
      .then((response)=>{
            if(response.data.status===true){
                console.log(response.data);
                localStorage.setItem('user',JSON.stringify(response.data.data))
                localStorage.setItem('token',JSON.stringify(response.data.auth))
                alert(response.data.message);
                navigate('/product');
            }
           else{
            alert(response.data.message)
           }
           
           
            
        }).catch((error)=>{
            console.log(error);
            alert('problem!')
        })
    }

    return(
        <div className="signup">
            <h2>signup</h2>
            <input type="text" className="inputbox" placeholder="enter your name" onChange={namechange} value={name}/>
            <input type="email" className="inputbox" placeholder="enter your email" onChange={emailchange} value={email}/>
            <input type="password" className="inputbox" placeholder="enter password" onChange={passwordchange} value={password}/>
            <button className="btn" onClick={buttonclick}>Sign Up</button>
          
        </div>
  )
}

export default Signup
