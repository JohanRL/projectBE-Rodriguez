const { Router } = require("express")
const fs = require("fs")
const products = require('../products.json')

const router = Router()
let carts = []
try {
    carts = JSON.parse(fs.readFileSync("carts.json"))
} catch (err) {
    console.log("error loading files in the cart", err)
}


const exportCartsToJSON = (fileName) => {
    const cartsJSON = JSON.stringify(carts)
    const filePath= 'carts.json'
    fs.truncate(filePath, 0, () => {
        fs.writeFile(filePath, cartsJSON, (err) => {
            if (err) {
                throw new Error (`error writing file ${err}`)
            } else {
                console.log(`Products have been successfully added to the file ${fileName}`)
            }
        })
    })
}


router.post ('/', (req, res) => {
    const newCart = {
        id: carts.length + 1,
        products: []
    }
    carts.push(newCart)
    console.log(newCart)
    res.send({status: "success", message: "new cart created"})
    exportCartsToJSON('carts.json')
})

router.get ("/:cid", (req, res) => {

    const cartId = parseInt(req.params.cid)

    const cart = carts.find( cart => cart.id === cartId )
    if (!cart) {
        const error = {error: 'cart not found'}
        return res.status(404).send(error)
    }

    
    res.send(cart.products)
}) 

router.post('/:cid/product/:pid', function(req, res) {
    
    const cartId = req.params.cid
    const productId = req.params.pid
    
    const cart = carts.find(c => c.id === parseInt(cartId))
    
    if (!cart) {
        res.status(404).send('Cart not found')
        return
    }

    const productIndex = products.findIndex(p => p.id === parseInt(productId))
    if (productIndex === -1) {
        
        res.status(404).send('Product not found')
        return
    }
    products[productIndex].quantity--
    
    const existingProduct = cart.products.find(p => p.product === parseInt(productId))
    if (existingProduct) {
        existingProduct.quantity++
    } else {
        cart.products.push({ product: parseInt(productId), quantity: 1 })
    }
    
    res.send(cart)
    fs.writeFile('../products.json', JSON.stringify(products), function(err) {
        if (err) {
            res.status(404).json(err)
        }
        console.log('products.json has been updated')
    })
    exportCartsToJSON('carts.json')
});

module.exports = router