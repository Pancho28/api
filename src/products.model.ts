import Product from "./products.schema";

class ProductModel {

    async getProducts() {
        return await Product.find();
    }

    async getProductById(id: string) {
        return await Product.findOne({ id: id });
    }

}

export default new ProductModel();