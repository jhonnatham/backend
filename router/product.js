const express = require('express')
const router = express.Router()
const Products = require('../model/product')

// validate request
const { check, validationResult } = require('express-validator')
const myValidationResult = validationResult.withDefaults({
    formatter: error => error.msg,
});

/**
 * GET
 */

router.get('/', async (req, res) => {
    const products = await Products.getAll()
    res.send(products)
})

router.get('/:productid([0-9]+)', async (req, res) => {
    const product = await Products.get(req.params.productid)

    if (!product) {
        res.status(400).send('identifier does not exist')
    } else {
        res.status(200).send(product)
    }
})

/**
 * END GET
 */

/**
 * POST
 */
router.post('/create', 
[
    check('name', 'Name is not empty').notEmpty(),
],
async (req, res) => {
    const errors = myValidationResult(req).array();
    if (errors.length > 0) {
        return res.status(422).json({errors: errors})
    }

    const available = req.body.available ? req.body.available : 0

    const product = {
        id: 0,
        name: req.body.name,
        available: available
    }

    product.id = await Products.create(product)
    res.status(201).send(product)
})

/**
 * END POST
 */

/**
 * PUT
 */
router.put('/:id', 
[
    check('name', 'Name is not empty').notEmpty(),
],
async (req, res) => {
    const errors = myValidationResult(req).array();
    if (errors.length > 0) {
        return res.status(422).json({errors: errors})
    }

    let product = await Products.get(req.params.id)
    if (!product) return res.status(404).send('Product is empty')

    const available = req.body.available ? req.body.available : 0

    product.name = req.body.name
    product.available = req.body.available 

    product.id = await Products.update(product)
    res.status(204).send()
})

/**
 * END PUT
 */

/**
 * DELETE
 */

router.delete('/:id', async (req, res) => {
    try {

        let product = await Products.get(req.params.id)
        if (!product) return res.status(404).send('Product is empty')

        const result = await Products.deleteOne(product)

        res.status(200).send("product delete")
    } catch (error) {
        res.status(500).send(error.message)
    }
})

/**
 * END DELETE
 */
module.exports = router