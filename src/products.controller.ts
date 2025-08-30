import express from 'express';
import productsData from './data/products.json';
import { Product } from './types.ts';

class ProductsController {

    constructor(){

    }

    async getProducts(req: express.Request, res: express.Response) {
        const { search, sort, order, page, limit, available } = req.query;
        let filteredProducts = [...(productsData as Product[])];

        // Filtrar por disponibilidad (isAvailable)
        if (available !== undefined) {
          const isAvailable = (available === 'true');
          filteredProducts = filteredProducts.filter(product => product.isAvailable === isAvailable);
        }

        // Busqueda por nombre
        if (search) {
          const searchTerm = String(search).toLowerCase();
          filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
          );
        }
    
        // Ordenamiento
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

        // Paginacion
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
        const product = productsData.find(item => item.id === id);
        if (product) {
            return res.json(product);
        }
        return res.status(404).json({ message: "Product not found" });
    }

}

export default ProductsController;