import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Addproduct = () => {
    const [name, setname] = useState('')
    const [price, setprice] = useState('')
    const [category, setcategory] = useState('')

    const [company, setcompany] = useState('')

    const navigate = useNavigate();
    const namechange = (e) => {
        setname(e.target.value)
    }
    const pricechange = (e) => {
        setprice(e.target.value)
    }
    const categorychange = (e) => {
        setcategory(e.target.value)
    }

    const companychange = (e) => {
        setcompany(e.target.value)
    }

    const buttonclick = () => {
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        axios({
            method:'post',
            url:'http://localhost:2345/addproduct',
            data:{
                name: name,
                price: price,
                category: category,
                userId: userId,
                company: company 
            }
        }
    ).then((response) => {
            if (response.data.status === false) {
                alert(response.data.message);
                
            }
            else {
                alert(response.data.message);
                console.log(response.data);
                navigate('/product')
            }

        }).catch((error) => {
            alert('error');
            console.log(error)
        })
    }
    return (
        <div className='addproduct'>
            <h2>Add Product</h2>
            <input type="text" className="inputbox" placeholder="enter product name" onChange={namechange} value={name} />
            <input type="text" className="inputbox" placeholder="enter price" onChange={pricechange} value={price} />
            <input type="text" className="inputbox" placeholder="enter category" onChange={categorychange} value={category} />

            <input type="text" className="inputbox" placeholder="enter company" onChange={companychange} value={company} />

            <button className="btn" onClick={buttonclick}>Add Product</button>
        </div>
    )
}

export default Addproduct
