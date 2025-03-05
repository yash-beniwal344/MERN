import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Addproduct = () => {
    const [name, setname] = useState('')
    const [price, setprice] = useState('')
    const [category, setcategory] = useState('')

    const [company, setcompany] = useState('')
    const [image, setimage] = useState('')

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
    const imagechange = (e) => {
        setimage(e.target.files);

    }
   

    const buttonclick = () => {
        console.log(image)
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        var formData = new FormData()
        formData.append('name',name);
        formData.append('price',price);
        formData.append('category',category);
        formData.append('userId',userId);
        formData.append('company',company);

        for (let index = 0; index < image.length; index++) {
            const element = image[index];
            formData.append('image',element);
        }
        

    

        axios({
            method:'post',
            url:`http://localhost:2345/${process.env.REACT_APP_add_api}`,
          data: formData,
            headers:{
            authorization:`bearer ${localStorage.getItem('token')}`
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
            <input type="text" className="inputbox" placeholder="enter product name" onChange={namechange}/>
            <input type="text" className="inputbox" placeholder="enter price" onChange={pricechange} />
            <input type="text" className="inputbox" placeholder="enter category" onChange={categorychange}  />
            <input type="text" className="inputbox" placeholder="enter company" onChange={companychange} />
            <input type="file" className="inputboxx"  onChange={imagechange} multiple />

            <button className="btn" onClick={buttonclick}>Add Product</button>
        </div>
    )
}

export default Addproduct

                