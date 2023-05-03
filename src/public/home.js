const socket = io()
const ProductsManager = require('../manager/productsManager')

const products = new ProductsManager()

socket.on(
    fetch('./manager/data/products.json')
    .then(res => {
        const resProducts = products.getAllProducts()
        return resProducts
    })
    .catch(error)(
        console.log(error)
    )
)