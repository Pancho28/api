import {Product} from '../src/types'

export function getTopCheapestAvailable(products: Product[], top=3){

    const productsAvailable = products.filter(product => product.isAvailable);

    const sortedPrices = productsAvailable.map(product => product.price).sort((a, b) => a - b);

    return sortedPrices.slice(0, top);

}