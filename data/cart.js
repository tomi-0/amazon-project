// Will store product object in this array
//export let cart = [];
export let cart = [{
    productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
    quantity:1,
}, {
    productId:'54e0eccd-8f36-462b-b68a-8182611d9add',
    quantity: 2,
}];

// adds product along with ots quantity to cart
export function addToCart (productId, quantity) {
  let inCart = false;

  // Checks if product is already in cart
  cart.forEach(cartItem => {
    if (cartItem.productId === productId) {
      // If so quantity is incremented
      cartItem.quantity+= quantity;
      inCart = true;
    } 
  });

  // If not in cart a new object is added to cart array
  if (!inCart) {
    cart.push({
      productId,
      quantity: quantity,
    });
  };
}

export function removeFromCart(productId) {
  // uses .filter() to remove an item from cart 
  cart = cart.filter( (cartItem) => {
    if (cartItem.productId === productId ) {
      return false;
    } return true;
  });
}
