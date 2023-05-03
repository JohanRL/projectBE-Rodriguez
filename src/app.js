const express = require('express');
const { Server } = require('socket.io')
const handlebars = require('express-handlebars')
const viewsRouter = require('./routes/views.router.js')
const productRouter = require('./routes/products.routes.js')
const cartsRouter = require('./routes/carts.routes.js')
const realTime = require('')

const PORT = process.env.PORT||8080

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(__dirname+'/public'))
app.engine('handlebars', handlebars.engine())
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');

//Middleware

app.use((req, res, next) => {

    if (req.body && req.body._method) {
        req.method = req.body._method
        delete req.body._method
    }
    next()
})

app.use('/api', cartsRouter)
app.use('/api', productRouter)
app.use('/', viewsRouter)
app.use('/realtimeproducts', realTime)

const server = app.listen(PORT, () => {
    console.log(`Server started in the port: ${PORT}`)
})

const io = new Server(server)

const products = []

io.on('connection', socket =>{
    console.log('Connected')

    socket.on("message1", data => {
        io.emit('log', data)
    })

    socket.on("message2", data => {
        products.push({socketid:socket.id, message:data})
        io.emit('log', {products})
    })
})