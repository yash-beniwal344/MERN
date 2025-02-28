const express = require('express');
const app = express();
require('./db/config');
const users = require('./db/UserSchema');
const productschema = require('./db/productschema')
const cors = require('cors');;
app.use(cors());
app.use(express.json());
const nodemailer = require('nodemailer');




app.post("/signup", async (req, resp) => {
  if (req.body.name == "" || req.body.email == "" || req.body.password == "") {
    resp.send({ status: false, message: "all field are require" });
  } else {
    let data = users(req.body);
    let result = await data.save();
    result = result.toObject();
    delete result.password;
    resp.send({ status: true, message: "signup complete", data: result });

  }
})


app.post("/login", async (req, resp) => {
  if (req.body.password && req.body.email) {
    let user = await users.findOne(req.body).select("-password");
    if (user) {
      resp.send({ status: true, message: "login parfectly", data: user });
    }
    else {
      resp.send({ status: false, message: "user not found" });
    }
  }
  else {
    resp.send({ status: false, message: "enter all details" });
  }

}
)

app.post("/addproduct", async (req, resp) => {
  if (
    req.body.name == "" ||
    req.body.price == "" ||
    req.body.category == "" ||
    req.body.company == ""
  ) {
    resp.send({ status: false, message: "all field are require" });
  } else {
    let product = new productschema(req.body);
    let result = await product.save();
    console.log(req.body)
    resp.send({ status: true, message: "data inserted", data: result });
  }
});

app.get('/products', async (req, resp) => {
  const item = await productschema.find();
  if (item.length == 0) {
    resp.send({ status: false, message: 'not found aney product' })
  }
  else {
    resp.send({ status: true, message: 'product found', data: item })
  }
});

app.delete('/product/:id', async (req, resp) => {
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


app.put('/update/:id', async (req, resp) => {
  let result = await productschema.updateOne({ _id: req.params.id }, { $set: req.body });
  if (result) {
    resp.send({ status: true, message: 'product updated', data: result });
    console.log(req.body)
  }
  else {
    resp.send({ status: false, message: 'error' })
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



app.post('/email', async (req, resp) => {
  if (req.body.email == "" || req.body.subject == "" || req.body.text == "") {
    resp.send({ status: false, message: 'enter all details' })
  }
  else {
    let details = {
      from: 'yashkaran.344@gmail.com',
      to: req.body.email,
      subject: req.body.subject,
      text: req.body.text
    };
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 465,
      secure: true,
      auth: {
        user: 'yashkaran.344@gmail.com',
        pass: 'fzovuijoolwxgbsq'
      }
    });
    const info = await transporter.sendMail(details, (error, response) => {
      if (error) {
        resp.send({ status: false, message: 'some error found! ' })
      }
      else {
        resp.send({ status: true, message: `email sending ${req.body.email}`, data: info });
      }
    });

  }
});





app.listen(2345, () => {
  console.log('server live')
});     