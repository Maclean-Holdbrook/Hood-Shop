const fs = require('fs');

const data = JSON.parse(fs.readFileSync('products.json', 'utf8'));
const products = data.products;
let missing = 0;

products.forEach(p => {
  if (!p.images || p.images.length === 0 || !p.images[0]) {
    console.log('Missing:', p.id, p.name, p.images);
    missing++;
  }
});

console.log('\nTotal products:', products.length);
console.log('Products with missing images:', missing);
