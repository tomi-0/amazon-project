// generates HTML for all item objects in the products.js products array
let productsHTML = '';
products.forEach( (product) => {
    productsHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents/100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    `;
});

// Adds prducts to webpage
document.querySelector('.js-products-grid').innerHTML = productsHTML;


// Object to store timeouts for each product
let addedMessageTimeoutIds = {};

// Adds event listener to each button
document.querySelectorAll('.js-add-to-cart-button')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const { productId } = button.dataset;
      let inCart = false;

      // Collects the quantity from dropdown menu
      // Converted to number as values we get from DOM are string by default
      let quantity = Number (document.querySelector(`.js-quantity-selector-${productId}`).value);
      
      // Checks if product is already in cart
      cart.forEach((product) => {
        if (product.productId === productId) {
          // If so quantity is incremented
          product.quantity+= quantity;
          inCart = true;
        } 
      });

      // Displayed 'Added' message on screen for 2s
      const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`).classList.add('toggled');

      // Clear any timeouts for the product
      const previousTimeoutId = addedMessageTimeoutIds[productId];
      if (previousTimeoutId) {
        clearTimeout(previousTimeoutId);
      } 
        
      timeoutId = setTimeout( () => {
        document.querySelector(`.js-added-to-cart-${productId}`).classList.remove('toggled');
      }, 2000);

      // Saves timeout id to product id
      addedMessageTimeoutIds[productId] = timeoutId;
      

      // If not in cart a new object is added to cart array
      if (!inCart) {
        cart.push({
          productId,
          quantity,
        });
      };

      // Calculates total quantity of cart
      // inside loop to increment as products are added
      let totalQuantity = 0;
      cart.forEach( (product) => {
        totalQuantity += product.quantity;
      })
      document.querySelector('.js-cart-quantity')
        .innerHTML = totalQuantity;
    })
  });

// 