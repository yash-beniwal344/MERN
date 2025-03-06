import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';

const ProductList = (img) => {
  const [show, setShow] = useState(false);
 const [images,setimages] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = (img) =>{
    setimages(img)
    setShow(true);

 
  } 
  const [product, setproduct] = useState([]);
  const navigate = useNavigate();
             
  useEffect(() => {
    getproduct();
  }, []);

  const getproduct = () => {
    axios({
      method:'get',
      url:`http://localhost:2345/${process.env.REACT_APP_products_api}`,
      headers:{
        authorization:`bearer ${localStorage.getItem('token')}`
      }
    })
     
      .then((item) => {
        if (item.data.status === true) {
          setproduct(item.data.data);
        } else {
          alert(item.data.message);
        }
      })
      .catch((err) => {
        console.log("api error");
      });
  };
  const deleteproduct = (id) => {
    const userconfirm = window.confirm('can you trying to delete product');
    if (userconfirm) {
      axios
        .delete(`http://localhost:2345/product/${id}`, {
          headers: {
            authorization: `bearer ${localStorage.getItem('token')}`
          }
        })
        .then((response) => {
          if (response.data.status === true) {
            alert(response.data.message)
            getproduct();
          } else {
            alert(response.data.message);
          }
        })
        .catch((error) => {
          alert("backend problem");
          console.log(error);
        });
    } else {
      getproduct();
    }
  };
  const Updateproduct = (id) => {
    navigate(`/update/${id}`);
  };

  const searchchange = (e) => {
    let key = e.target.value;
    if (key) {
      axios({
        method:'get',
        url:`http://localhost:2345/search/${key}`,

      }).then((response) => {
        if (response.data.status === true) {
          setproduct(response.data.data);
        }
      });
    } else {
      getproduct();
    }
  };
  return (
    <>
     

      
         <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>{images.map((item)=>{
          
        


          return(
            
            <div className='img-box'>
              
              <img src={`http://localhost:2345/${item}`} alt='img' style={{width:'100px',marginBottom:'10px'}}/>
            
            </div>
          )
        })}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>
      
    <div className="productlist">
      <input
        type="text"
        placeholder="search product"
        className="search"
        onChange={searchchange}
      />

      {product.length > 0 ? (<table>
        <thead>
          <tr>
          <th>image</th>
            <th> product name</th>
            <th>product price</th>
            <th>product category</th>
            <th>product userId</th>
            <th>product company</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
            
              {product.map((item,index) => {
                return (
          <tr key={index}>

            
            <td><img src={`http://localhost:2345/${item.image[0]}`} alt='img' style={{width:'50px'}} onClick={()=>handleShow(item.image)}/> </td>

            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>{item.category}</td>
            <td>{item.userId}</td>
            <td>{item.company}</td>
            <td>
              <button
                className="deletebtn"
                onClick={() => deleteproduct(item._id)}
              >
                Delete
              </button>
              <button
                className="updatebtn"
                onClick={() => Updateproduct(item._id)}
              >
                update
              </button>
            </td>
          </tr>
          )})
              }

        </tbody>
      </table>) : (
        <h1>product not found</h1>
      )}
    </div>
    </>
  )
}

export default ProductList
