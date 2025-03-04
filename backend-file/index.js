const express = require('express');
const app = express();
require('./db/config');
const users = require('./db/UserSchema');
const productschema = require('./db/productschema');
const fs = require('fs');
const cors = require('cors');;
app.use(cors());
app.use(express.json());
const jwt = require('jsonwebtoken');
const jwtkey = 'yash-verma';
const path = require('path');

const multer = require('multer');
app.use(express.static(__dirname+'/file'));

const uplode = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'file');
    },
    filename: function (req, file, cb) {
      cb(null, file.filename + '-' + Date.now() + '.jpg');
    }
  })
}).single('image')

const verifytoken = (req, resp, next) => {
  let token = req.headers['authorization'];
  if (token) {
    token = token.split(' ')[1];
    token = token.replace(/"/g, '');
    jwt.verify(token, jwtkey, (error, valid) => {
      if (valid) {

        next();
      }
      else {
        resp.send({ status: false, message: 'enter valid token' });

      }
    });
  }
  else {
    resp.send({ status: false, message: 'enter token ' });
  }


}

app.post("/signup", async (req, resp) => {
  if (req.body.name == "" || req.body.email == "" || req.body.password == "") {
    resp.send({ status: false, message: "all field are require" });
  } else {
    let data = users(req.body);
    let result = await data.save();
    result = result.toObject();
    delete result.password;
    jwt.sign({ result }, jwtkey, { expiresIn: "2d" }, (err, token) => {
      if (err) {
        resp.send({ status: false, message: "somthing went wrong" })
      }
      else {
        resp.send({ status: true, message: "signup complete", data: result, auth: token });

      }
    })

  }
});

app.post("/login", async (req, resp) => {
  if (req.body.password && req.body.email) {
    let user = await users.findOne(req.body).select("-password");
    if (user) {
      jwt.sign({ user }, jwtkey, { expiresIn: "2d" }, (err, token) => {
        if (err) {
          resp.send({ status: false, message: "somthing went wrong" });
        }
        else {
          resp.send({ status: true, message: "login parfectly", data: user, auth: token });
        }
      })

    } else {
      resp.send({ status: false, message: "user not found" });
    }
  } else {
    resp.send({ status: false, message: "enter all details" });
  }
});

app.post("/addproduct", uplode, verifytoken, async (req, resp) => {
  if (
    req.body.name == "" ||
    req.body.price == "" ||
    req.body.category == "" ||
    req.body.company == "" ||
    req.body.userId == "" ||
    req.file == null
  ) {
    resp.send({ status: false, message: "all field are require" });
  } else {
   
    let image = req.file.filename;
   let name = req.body.name;
   let price = req.body.price;
   let category = req.body.category;
   let company = req.body.company;
   let userId = req.body.userId;
    let product = new productschema({name,price,category,company,userId,image});
    let result = await product.save();
    console.log(req.body.name);
    console.log(req.file);
 
    resp.send({ status: true, message: "data inserted", data: result });
  }
});

app.get('/products', verifytoken, async (req, resp) => {
  const item = await productschema.find();
  
  if (item.length == 0) {
    resp.send({ status: false, message: 'not found aney product' })
  }
  else {
    resp.send({ status: true, message: 'product found', data: item });
  
  }
});

app.delete('/product/:id', verifytoken, async (req, resp) => {
  let result = await productschema.deleteOne({ _id: req.params.id });
  if (result) {
    resp.send({ status: true, message: 'product deleted', data: result });

  }
  else {
    resp.send({ status: flase, message: 'error' })
  }

});

app.get('/product/:id', async (req, resp) => {
  let product = await productschema.findOne({ _id: req.params.id });
  if (product) {

    resp.send({ status: true, message: 'data found', data: product });
   
  }
  else {
    resp.send({ status: false, message: "data not found" });
  }
});


app.put('/update/:id',uplode, verifytoken, async (req, resp) => {

  let name = req.body.name;
  let price = req.body.price;
  let category = req.body.category;
  let company = req.body.company;
 

  if(!name || !price || !category || !company ){
    resp.send({status:false,message:'all fields require'});
  }
  else{
     let product = await productschema.findOne({ _id: req.params.id });
      var oldimage = product.image;
    if(req.file==null){
     
      var image = oldimage
      let result = await productschema.updateOne({ _id: req.params.id }, { name,price,category,company,image});
      if (result) {
        resp.send({ status: true, message: 'product updated', data: result });
       
      }
      else {
        resp.send({ status: false, message: 'error' });
       
      }
    }
    else{
      // let product = await productschema.findOne({ _id: req.params.id });
      // var oldimage = product.image;
     const oldpath = path.join(__dirname,'./file/'+oldimage);
     fs.unlink(oldpath,(error)=>{
      if(error){
        console.log(error)
      }
     });
      var image = req.file.filename
      let result = await productschema.updateOne({ _id: req.params.id }, { name,price,category,company,image});
     
      if (result) {
        resp.send({ status: true, message: 'product updated', data: result });
       
      }
      else {
        resp.send({ status: false, message: 'error' });
       
      }
    }
  }
 
});




app.get('/search/:key', async (req, resp) => {
  let result = await productschema.find({
    "$or": [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } }

    ]
  });
  if (result) {
    resp.send({ status: true, message: 'found', data: result })
  }
  else {
    resp.send({ status: false, message: ' not found' })
  }

});

app.post('/uplodephoto', uplode, async (req, resp) => {


  resp.send({ mess: 'file uplode' });


});


app.listen(2345);
 