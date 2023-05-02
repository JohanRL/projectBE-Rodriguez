const fs = require('fs');
const path = require("path");
const ProductsManager = require('./productsManager');

class CartManager {
    productsManager = new ProductsManager()

    constructor() {
        this.path = path.join(__dirname, "./data/carts.json");
    }

    async getAllCarts () {
        

        const cartsJson = await fs.promises.readFile(this.path, 'utf-8')

        
        if (!cartsJson.trim()) {
            return []
        }
        
        const cartsParse = JSON.parse(cartsJson)

        return cartsParse;
    }

    async createCart() {
        
        const carts = await this.getAllCarts()

        const newCart = {
            id: Date.now(),
            products: [],
        }
        
        carts.push(newCart)

        await fs.promises.writeFile(this.path, JSON.stringify(carts))

        return carts
    }

    async getCartById(id) {
        
        const carts = await this.getAllCarts()

        const cart = carts.find((cart) => cart.id === id)

        if (!cart) {
            return `Unable to find cart with the id: ${id}`
        } else {
            return cart
        }
    }

    async addProductToCart(idCart, idProduct) {

        const carts = await this.getAllCarts()

        const product = await this.productsManager.getProductsById(idProduct)

        if (!product) {
            return `Unable to find product with the id: ${id}`
        }

        const cartIndex = carts.findIndex(cart => cart.id === idCart)
        //tambien va a dar como resultado si no encuentra -1
        
        if (cartIndex === -1) {
            return `Unable to find cart with the id: ${id}`
        } else {
            carts[cartIndex].products.push(product)

            await fs.promises.writeFile(this.path, JSON.stringify(carts))

            return carts
        }
    }

    async deleteCart(id) {
        
        const carts = await this.getAllCarts();
    
        const cartsFilters = carts.filter((cart) => cart.id !== id);
    
        await fs.promises.writeFile(this.path, JSON.stringify(carts));
    
        return cartsFilters;
        }
}

module.exports = CartManager