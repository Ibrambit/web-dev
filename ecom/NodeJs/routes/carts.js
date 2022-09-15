const express = require('express');
const router = express.Router();
const cartsRepo = require('../repositories/carts');
const productsRepo = require('../repositories/products');
const cartShowTemplate = require('../views/carts/show');

// receive a post req to add item to cart
router.post('/cart/products', async (req, res) => {
	// figure out the cart
	let cart;
	if (!req.session.cartId){
		cart = await cartsRepo.create({items: [] });
		req.session.cartId = cart.id;
	} else {
		// we have a cart, get it from repo
		cart = await cartsRepo.getOne(req.session.cartId);
	}
	// either increment or add new product
	const existingItem = cart.items.find(item => item.id === req.body.productId);
	if (existingItem) {
		// increment quantity and save
		existingItem.quantity++;
	} else {
		// add new product to items
		cart.items.push({id: req.body.productId, quantity: 1});
	}
	// update the cart
	await cartsRepo.update(cart.id, {items: cart.items});
	res.redirect('/cart');
});

// receive a get req to show items in cart
router.get('/cart', async (req, res) => {
	if(!req.session.cartId) {
		res.redirect('/');
	}
	const cart = await cartsRepo.getOne(req.session.cartId);
	for (let item of cart.items) {
		item.product = await productsRepo.getOne(item.id);
	}
	res.send(cartShowTemplate({items: cart.items}));
});

// receive post req to delete item in cart
router.post('/cart/products/delete', async (req, res) => {
	const {itemId} = req.body;
	const cart = await cartsRepo.getOne(req.session.cartId);
	const items = cart.filter(item => item.id !== itemId); // item will be equal to oldItems-(item.id === itemId)
	await cartsRepo.update(req.session.cartId, {items});
	res.send('/cart');
});


module.exports = router;