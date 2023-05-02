const { Router } = require('express')
const CartManager = require('../manager/cartManager')

const cartsManager = new CartManager()
//para evitar errores
const path = 'carts'

const router = Router()


router.get(`/${path}`, async (req, res) => {
    
    try {
        
        const resCarts = await cartsManager.getAllCarts()

        res.status(200).json(resCarts)

    } catch(error) {
        console.log(error)
    }
})

router.get(`/${path}/:id`, async (req, res) => {
    
    const {id} = req.params

    try {
        const resCarts = await cartsManager.getCartById(parseInt(id))
        
        res.status(200).json(resCarts)

    } catch (error) {
        console.log(error)
    }
})

router.post(`/${path}`, async (req, res) => {

    try{
        
        const resCarts = await cartsManager.createCart()

        res.status(200).json(resCarts)

    } catch(error) {
        console.log(error)
    }
})

router.post(`/${path}/:idCart/product/:idProduct`, async (req, res) => {

    const { idCart, idProduct } = req.params

    try {

        const resCarts = await cartsManager.addProductToCart(parseInt(idCart), parseInt(idProduct))

        res.status(200).json(resCarts)

    } catch(error) {
        console.log(error)
    }
})

router.delete(`/${path}/:id`, async (req, res) => {

    const { id } = req.params

    try {
        
    const resCarts = await products.deleteCart(parseInt(id))

    res.status(200).json(resCarts)

    } catch (error) {
    console.log(error);
    }
})

router.get(`/${path}`, async (req, res) => {
    
    try {

        const resCarts = await cartsManager.getAllCarts()

        res.status(200).json(resCarts)

    } catch(error) {
        console.log(error)
    }
})

module.exports = router