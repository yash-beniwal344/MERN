import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Updateproduct = () => {
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("");
  const [company, setcompany] = useState("");
  const param = useParams();
  const navigate = useNavigate();

  const changename = (e) => {
    setname(e.target.value);
  };
  useEffect(() => {
    const getproductdetails = () => {
      axios({
        method:'get',
        url:`http://localhost:2345/product/${param.id}`,
     
      })
       
        .then((response) => {
          if (response.data.status === true) {
            setname(response.data.data.name);
            setprice(response.data.data.price);
            setcategory(response.data.data.category);
            setcompany(response.data.data.company);
          } else {
            alert(response.data.message);
            navigate("/product");
          }
        })
        .catch((error) => {
          alert("backend error");
          console.log(error);
        });
    };
    getproductdetails();
  }, [param.id, navigate]);

  const buttonclick = () => {
    console.log(name, price, category, company);
    axios
      ({
        method:'put',
        url:`http://localhost:2345/update/${param.id}`,
        data: {
          name: name,
          price: price,
          category: category,
          company: company
        },
        headers: {
          authorization: `bearer ${localStorage.getItem('token')}`
        }
      
       
      })
      .then((response) => {
        if (response.data.status === true) {
          alert(response.data.message);
          navigate("/product");
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        alert("Failed to update product");
        console.log(error);
      });
  };
  return (
    <div className="updateproduct">
      <h2>Update Product</h2>
      <input
        type="text"
        className="inputbox"
        placeholder="enter product name"
        onChange={changename}
        value={name}
      />
      <input
        type="text"
        className="inputbox"
        placeholder="enter price"
        onChange={(e) => {
          setprice(e.target.value);
        }}
        value={price}
      />
      <input
        type="text"
        className="inputbox"
        placeholder="enter category"
        onChange={(e) => {
          setcategory(e.target.value);
        }}
        value={category}
      />
      <input
        type="text"
        className="inputbox"
        placeholder="enter company"
        onChange={(e) => {
          setcompany(e.target.value);
        }}
        value={company}
      />

      <button className="btn" onClick={buttonclick}>
        Update Product
      </button>
    </div>
  )
}

export default Updateproduct


