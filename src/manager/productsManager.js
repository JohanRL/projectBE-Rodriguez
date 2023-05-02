const fs = require('fs');
const path = require('path');

class ProductsManager {
    constructor() {
        this.path = path.join(__dirname,'./data/products.json')
    }

    async getAllProducts() {

        const productsJSON = await fs.promises.readFile(this.path, 'utf-8')

        if (!productsJSON.trim()){
            return([])
        }

        const productsParse = JSON.parse(productsJSON)
        return productsParse
    }

    async getProductsById(id) {
        
        const products = await this.getAllProducts()

        const product = products.find((product) => product.id === id)

        if (!product) return `Unable to find searched product with id: ${id}`
        
        return product
        
    }

    async addProduct(product) {

        const { title, price, description, thumbnail, status, stock, code, category } = product
        // tengo que buscar los productos en Json
        const products = await this.getAllProducts()

        const newProduct = {
            id: Date.now(), 
            title,
            price,
            description,
            thumbnail,
            status,
            stock,
            code,
            category,
        }

        const confirmProductInfo = Object.values(newProduct).includes(undefined)

        if (confirmProductInfo) return 'Fields are missing'
            //si todo esta bien se pushea y se devuelve la lista de productos
            products.push(newProduct)

            await fs.promises.writeFile(this.path, JSON.stringify(products))

            return products
    }

    async updateProduct(id, data) {
        // tengo que buscar los productos en Json
        const products = await this.getAllProducts()

        const productIndex = products.findIndex((product) => product.id === id)
        // productIndex si no encuentra el id siempre devuelve como resultado -1
        if (productIndex === -1) return `Unable to find searched product with id: ${id}`

        products[productIndex] = {
            ...products[productIndex],
            ...data,
        }

        const confirmProductInfo = Object.values(newProduct).includes(undefined)

        if (confirmProductInfo) return 'Fields are missing'
        
    

        await fs.promises.writeFile(this.path, JSON.stringify(products))

        return products
        
    }

    async deleteProduct (id) {

        // tengo que buscar los productos en Json
        const products = await this.getAllProducts()

        const product = products.find((product) => product.id === id)

        if (!product) return `Unable to find searched product with id: ${id}`

        //toca buscar el id por eso se hace el filtro
        const productsFilter = products.filter((product) => product.id !== id)

        await fs.promises.writeFile(this.path, JSON.stringify(productsFilter))

        return productsFilter
    }
}

module.exports = ProductsManager