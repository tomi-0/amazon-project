// Will store product object in this array
export const cart = [];

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
