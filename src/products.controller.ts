import express from 'express';
import { Product } from './types.ts';
import productsModel from './products.model.ts';

class ProductsController {

    constructor(){

    }

    async getProducts(req: express.Request, res: express.Response) {
        const { search, sort, order, page, limit, available } = req.query;

        let filteredProducts : Product[] = [];

        try {
          filteredProducts = await productsModel.getProducts();
        } catch (error) {
          return res.status(500).json({ message: "Error retrieving products" });
        }

        if (available !== undefined) {
          const isAvailable = (available === 'true');
          filteredProducts = filteredProducts.filter(product => product.isAvailable === isAvailable);
        }

        if (search) {
          const searchTerm = String(search).toLowerCase();
          filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
          );
        }
    
        if (sort) {
          const sortField = String(sort);
          const sortOrder = order === 'desc' ? -1 : 1;
        
          filteredProducts.sort((a, b) => {
            if (sortField === 'name') {
              const nameA = a.name.toLowerCase();
              const nameB = b.name.toLowerCase();
              if (nameA < nameB) return -1 * sortOrder;
              if (nameA > nameB) return 1 * sortOrder;
              return 0;
            }
            if (sortField === 'price') {
              return (a.price - b.price) * sortOrder;
            }
            return 0;
          });
        }

        const pageNumber = parseInt(String(page)) || 1;
        const limitNumber = parseInt(String(limit)) || 10;
        const startIndex = (pageNumber - 1) * limitNumber;
        const endIndex = startIndex + limitNumber;
    
        const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
        return res.json({
          products: paginatedProducts,
          total: filteredProducts.length,
          page: pageNumber,
          limit: limitNumber,
        });
    }

    async getProductById(req: express.Request, res: express.Response) {
        const { id } = req.params;
        try{
          const product = await productsModel.getProductById(id);
          if (product) {
            return res.json(product);
          } else{
            return res.status(404).json({ message: "Product not found" });
          }
        } catch (error) {
          return res.status(500).json({ message: "Error retrieving product" });
        }
    }

}

export default ProductsController;