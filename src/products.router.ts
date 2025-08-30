import express from 'express';
import ProductsController from './products.controller';

const route : express.Router = express.Router();

const productsController = new ProductsController();

route.get('/v1/products', (req, res) => productsController.getProducts(req, res));
route.get('/v1/products/:id', (req, res) => productsController.getProductById(req, res));

export default route;
