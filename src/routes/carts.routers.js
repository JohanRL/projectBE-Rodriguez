const { Router } = require('express')
const fs = require('fs')
const path = require('path')
const products= require('../data/products.json')

const router = Router()

let carts = []

const exportCartsJSON = () => {
    const cartsJSON = JSON.stringify(carts)
    const filePath = path.join(__dirname, '../data/carts.json')
    fs.writeFile(filePath, cartsJSON, (err) => {
        if (err) {
            return res.status(500).send(err)
        } else {
            console.log(`The file has been updated`)
        }
    })
}

const exportProductsJSON = () => {
    const productsJSON = JSON.stringify(products)
    const filePath = path.join(__dirname, '../data/products.json')
    fs.writeFile(filePath, productsJSON, (err) => {
        if (err) {
            return res.status(500).send(err)
        } else {
            console.log(`The file has been updated`)
        }
    })
}

router.get('/', (req, res) => {

    const newCart = { id: carts.length + 1, products: [] }

    console.log(newCart)

    carts.push(newCart)

    res.send({ status: 'success', message: 'Cart has been created' })

    exportCartsJSON('../data/carts.json')
})

router.get('/:cid', (req, res) => {
    
    const cartId = parseInt(req.params.cid)

    const cart = carts.find( cart => cart.id ===  cartId )

    if (!cart) {
        const error = { error: 'Cart not found' }
        return res.status(404).send(error)
    }

    res.send(cart.cartProducts)
})

router.post('/:cid/product/:pid', (req, res) => {

    const cartId = req.params.cid

    const productId = req.params.pid

    const cart = carts.find( cart => cart.id === parseInt(cartId) )

    if (!cart) {
        return res.status(404).send('Cart not found')
    }

    const productIndex = products.findIndex( p => p.id === parseInt(productId) )

    if (productIndex === -1 ) {
        return res.status(404).send('Product not found')
    }

    products[productIndex].stock--

    const existingProduct = cart.products.find( p => p.product === parseInt(productId))

    if (existingProduct) {
        existingProduct.quantity++
    } else {
        cart.products.push( { product: parseInt(productId), quantity: 1 } )
    }

    res.send(cart)

    exportCartsJSON('../data/carts.json')
    exportProductsJSON('../data/products.json')
})

router.delete('/:cid/products', (req, res) => {
    
    const cartId = req.params.cid

    let cart = carts.find( cart => cart.id ===  parseInt(cartId) )

    if (!cart) {
        const error = { error: 'cart not found' }
        console.log(cartId)
        console.log(cart)
        return res.status(404).send(error)
    }

    cart.products = []

    exportCartsJSON('../data/carts.json')
    return res.send( { status: "Products deleted" } )
})

module.exports = router