import { formatCurrency } from '/scripts/utils/money.js';

export let products = [];

export function loadProducts(callback) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    products = (JSON.parse(xhr.response).map( (product) => {
      if (product.type === 'clothing') {
        return new Clothing(product);
      }
      if (product.type === 'appliance'){
        return new Appliance(product);
      }
      return new Product(product);
    }));


    callback();
    console.log('load products');
  })

  xhr.open('GET', 'https://supersimplebackend.dev/products');
  xhr.send();
};



export function getProduct(productId) {
  let productElement;

  products.forEach( (product) => {
    if (product.id === productId) {
      productElement = product;
    }
  })

  return productElement;
}


export class Product {
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(product) {
    this.id = product.id;
    this.image = product.image;
    this.name = product.name;
    this.rating = product.rating;
    this.priceCents = product.priceCents;
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars*10}.png`;
  }

  getPrice() {
    return `$${formatCurrency(this.priceCents)}`;
  }

  extraInfoHTML() {
    return '';
  }

}

export class Clothing extends Product{
  sizeChartLink;

  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML() {
    return`
      <a href="${this.sizeChartLink}" target="_blank">Size chart</a>
    `;
  }
}

export class Appliance extends Product {
  instructionsLink = 'images/appliance-instructions.png';
  warrantyLink = 'images/appliance-warranty.png';

  constructor(productDetails) {
    super(productDetails);
  }

  extraInfoHTML() {
    return `
      <a href="${this.instructionsLink}" target="_blank">Instructions</a>
      <a href="${this.warrantyLink}" target="_blank">Warranty</a>
    `;
  }
}
