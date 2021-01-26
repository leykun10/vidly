const express = require('express')
const mongoose = require('mongoose')
const genreRouter = require('./router/genres')
const customerRouter=require('./router/customers')

const app = express()


mongoose.connect('mongodb://localhost/vidly',()=>{
    console.log('connected')
})
app.use(express.json());
app.use(function (error, req, res, next) {
    if(error instanceof SyntaxError){ //Handle SyntaxError here.
      return res.status(500).send({data : "Invalid data"});
    } else {
      next();
    }
  });
app.use('/api/genre',genreRouter)
app.use('/api/customer',customerRouter)

app.listen(8080,()=>{
    console.log(
        
        "server is up and running"
    )
})
