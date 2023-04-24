const express = require('express');
const productsRouter = require('./routes/products.routers.js');
const cartsRouter = require('./routes/carts.routers.js');

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/carts/', cartsRouter)
app.use('/api/products/', productsRouter)

const server = app.listen(8080, () => console.log('Listening on 8080'))