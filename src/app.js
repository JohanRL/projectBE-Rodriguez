const express = require('express');
const productRouter = require('./routes/products.routes.js');
const cartsRouter = require('./routes/carts.routes.js');

const PORT = process.env.PORT||8080

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api', cartsRouter)
app.use('/api', productRouter)

app.listen(PORT, () => {
    console.log(`Server started in the port: ${PORT}`)
})