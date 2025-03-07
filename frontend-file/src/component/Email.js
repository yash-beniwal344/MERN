import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Email = () => {
   const [email,setemail]=useState('')
   const [subject,setsubject]=useState('')
   const [text,settext]=useState('')
  const navigate = useNavigate();
   const emailchange = (e) =>{
    setemail(e.target.value)
   }
   const subjectchange = (e) =>{
    setsubject(e.target.value)
   }
   const textchange = (e) =>{
    settext(e.target.value)
   }

    const buttonclick = ()=>{
        axios({
            method:'post',
            url:'http://localhost:2345/email',
            data:{
                email:email,
                subject:subject,
                text:text
            }
        }).then((response)=>{
            if(response.data.status===true){
                alert(response.data.message);
                navigate('/product')
            }
            else{
                alert(response.data.message);
            }
        }).catch((error)=>{
            console.log(error);
            alert('backend problem')
        })
    }
  return (
    <div className="email">
    <h2>send mail</h2>
    <input type="email" className="inputbox" placeholder="enter email" onChange={emailchange} value={email}/>
    <input type="text" className="inputbox" placeholder="enter subject" onChange={subjectchange} value={subject}/>
    <input type="text" className="inputbox" placeholder="enter text" onChange={textchange} value={text}/>
    <button className="btn" onClick={buttonclick}>send mail</button>
  
</div>
  )
}

export default Email