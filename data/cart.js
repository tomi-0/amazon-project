// Will store product object in this array

// will either assign [] or current cart contents to cart array when page is reloaded
export let cart = [] && JSON.parse(localStorage.getItem('cart'));

// saves cart's contents to local storage
function saveToStorage() {
  localStorage.setItem('cart',JSON.stringify(cart));
}

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
  saveToStorage();
}

export function removeFromCart(productId) {
  // uses .filter() to remove an item from cart 
  cart = cart.filter( (cartItem) => {
    if (cartItem.productId === productId ) {
      return false;
    } return true;
  });
  saveToStorage();
}

export function calculateCartQuantity() {
  let totalQuantity = 0;
	cart.forEach( cartItem => {
		totalQuantity += cartItem.quantity;
	})
  return totalQuantity;
}

export function updateQuantity(productId, newQuantity) {
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      cartItem.quantity = newQuantity;
    }
  })
  saveToStorage();
}
