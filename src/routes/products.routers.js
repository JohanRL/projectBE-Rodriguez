const { Router } = require("express")
const fs = require("fs")

const router = Router()
let products = []

const exportProductsToJSON = (fileName) => {
    const productsJSON = JSON.stringify(products)
    const filePath= 'products.json'
    fs.truncate(filePath, 0, () => {
        fs.writeFile(filePath, productsJSON, (err) => {
            if (err) {
                throw new Error (`error writing file ${err}`)
            } else {
                console.log(`Products have been successfully added to the file ${fileName}`)
            }
        })
    })
}


router.get('/', (req, res) => {
    const limit = parseInt(req.query.limit)
    if (!limit) {
        return res.send({products})
    } else {
        productsLimit = products.slice(0, limit)
        return res.send(productsLimit)
    }
})

router.get('/:pid', (req, res) => {

    const productsId = parseInt(req.params.pid)

    const product = products.find(product => product.id === productsId)
    if (!product) {
        const error = {error: 'Product not found'}
        return res.status(404).send(error)
    }
    res.send(product)
})

router.post('/', (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body

    if ( !title || !description || !code || !price || !status || !stock || !category) {
        return res.status(400).send('Complete all fields')
    }
    const newProduct = {
        id: products.length + 1,
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails
    }
    products.push(newProduct)
    console.log(newProduct)
    res.send({status: "success"})
    console.log('Product successfully added')
    exportProductsToJSON('products.json')
})

router.put('/:pid', (req, res) => {

    const product = products.find(p => p.id === parseInt(req.params.pid));
    if (!product) {
        return res.status(404).send('Product not found');
    }
    product.title = req.body.title || product.title;
    product.description = req.body.description || product.description;
    product.code = req.body.code || product.code;
    product.price = req.body.price || product.price;
    product.status = req.body.status || product.status;
    product.stock = req.body.stock || product.stock;
    product.category = req.body.category || product.category;
    product.thumbnails = req.body.thumbnails || product.thumbnails;

    const productsJSON = JSON.stringify(products)
    fs.writeFile('products.json', productsJSON, (err) => {
        if (err) {
            return res.status(500).send({ error: `error writing file ${err}`})
        } else {
            return res.status(200).json({ status: "success", message: "Product upgraded" })
        }
    })
});

router.delete('/:pid', (req, res) => {

    const product = products.find(p => p.id === parseInt(req.params.pid));
    if (!product) {
        return res.status(404).send('Product not found');
    }
    
    products = products.filter(product => product.id != parseInt(req.params.pid));

    const productsJSON = JSON.stringify(products)
    fs.writeFile('products.json', productsJSON, (err) => {
        if (err) {
            return res.status(500).send({ error: `Error writing file ${err}`})
        } else {
            return res.status(200).send({ status: "success", message: "Product deleted" })
        }
    })
})

module.exports = router