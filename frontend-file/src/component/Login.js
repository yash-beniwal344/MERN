import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


    const Login = () => {
        const[email,setemail]=useState('');
        const[password,setpassword]=useState('');
     const navigate = useNavigate();
        const emailchange = (e)=>{
            setemail(e.target.value)
        }
        const passwordchange = (e)=>{
            setpassword(e.target.value)
        }
        
         useEffect(()=>{
              const auth = localStorage.getItem('user');
            if(auth){
              navigate('/product')
            }
            })
        const buttonclick = ()=>{
      
        axios({
            method:'post',
            url:'http://localhost:2345/login',
            data:{
                email:email,
                password:password
            }
       
        }).then((response)=>{
            if(response.data.status===true){
                alert(response.data.message);
                localStorage.setItem('user',JSON.stringify(response.data.data))
              
                console.log(response.data);
                navigate('/product')
            }
            else{
                alert(response.data.message);
                console.log(response.data.message)
            }
           
        }).catch((error)=>{
            alert('problem');
            console(error)
        })
        }
      return (
        <div className="login">
                <h2>login</h2>
    
                <input type="email" className="inputbox" placeholder="enter your email" onChange={emailchange} value={email}/>
                <input type="password" className="inputbox" placeholder="enter password" onChange={passwordchange} value={password}/>
                <button className="btn" onClick={buttonclick}>login</button>
              
            </div>
  )
}

export default Login
