import { cart,removeFromCart,calculateCartQuantity } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

// For each item in cart it will generate HTML code
let generatedHTML = '';
cart.forEach( cartItem => {
let productElement;

    products.forEach( (product) => {
        if (product.id === cartItem.productId) {
            productElement = product;
        }
    })

    generatedHTML += `
			<div class="cart-item-container js-cart-item-container-${productElement.id}">
        	<div class="delivery-date">
            Delivery date: Wednesday, June 15
          </div>

					<div class="cart-item-details-grid">
						<img class="product-image"
							src="${productElement.image}">

						<div class="cart-item-details">
							<div class="product-name">
								${productElement.name}
							</div>
							<div class="product-price">
								${formatCurrency(productElement.priceCents)}
							</div>
							<div class="product-quantity">
								<span>
									Quantity: <span class="quantity-label">${cartItem.quantity}</span>
								</span>
								<span class="update-quantity-link link-primary">
									Update
								</span>
								<span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id=${cartItem.productId}>
									Delete
								</span>
							</div>
						</div>

						<div class="delivery-options">
							<div class="delivery-options-title">
								Choose a delivery option:
							</div>

							<div class="delivery-option">
								<input type="radio" class="delivery-option-input"
									name="delivery-option-${productElement.id}">
								<div>
									<div class="delivery-option-date">
										Tuesday, June 21
									</div>
									<div class="delivery-option-price">
										FREE Shipping
									</div>
								</div>
							</div>
							<div class="delivery-option">
								<input type="radio" checked class="delivery-option-input"
									name="delivery-option-${productElement.id}">
								<div>
									<div class="delivery-option-date">
										Wednesday, June 15
									</div>
									<div class="delivery-option-price">
										$4.99 - Shipping
									</div>
								</div>
							</div>
							<div class="delivery-option">
								<input type="radio" class="delivery-option-input"
									name="delivery-option-${productElement.id}">
								<div>
									<div class="delivery-option-date">
										Monday, June 13
									</div>
									<div class="delivery-option-price">
										$9.99 - Shipping
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
    `;
    
} )

document.querySelector('.js-order-summary')
.innerHTML = generatedHTML;

// Will remove an item if the delete link in clicked
document.querySelectorAll('.js-delete-quantity-link').forEach( (deleteLink) => {
		// removes item from cart
    deleteLink.addEventListener('click', () => {
			const id = deleteLink.dataset.productId;
			removeFromCart(id);

			// removes item from web page
			document.querySelector(`.js-cart-item-container-${id}`).remove();
			updateCheckoutQuantity();
    });
});

// Will update checout number let totalQuantity = 0;
function updateCheckoutQuantity() {
	const total = calculateCartQuantity();
	document.querySelector('.js-checkout-number')
		.innerHTML = `${total} items`;
}

updateCheckoutQuantity();