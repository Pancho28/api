import { getTopCheapestAvailable } from './utils';
import productsData from '../src/data/products.json';
import { Product } from '../src/types';

const top3AvailableProducts = getTopCheapestAvailable(productsData as Product[], 3);
const top5AvailableProducts = getTopCheapestAvailable(productsData as Product[], 5);

// Muestra los resultados en la consola
console.log('--- Top 3 productos más baratos disponibles ---');
console.log(top3AvailableProducts);

console.log('\n--- Top 5 productos más baratos disponibles ---');
console.log(top5AvailableProducts);
