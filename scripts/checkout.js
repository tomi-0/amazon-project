import { cart,removeFromCart,calculateCartQuantity,updateQuantity } from '../data/cart.js';
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
									Quantity: <span class="quantity-label js-quantity-label-${cartItem.productId}">${cartItem.quantity}</span>
								</span>
								<span class="update-quantity-link link-primary js-update-quantity" data-product-id=${cartItem.productId}>
									Update
								</span>
								<input class="quantity-input js-quantity-input-${cartItem.productId}" >
								<span class="save-quantity-link js-save-quantity-link link-primary"data-product-id=${cartItem.productId}>Save</span>
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

// retrieves all update links from each cart item
document.querySelectorAll('.js-update-quantity').forEach( (cartItem) => {
	// adds event listener to each cart item
	cartItem.addEventListener('click', () => {
		const id = cartItem.dataset.productId;
		// if we add new elements here they become click-only, won't keep update & save separate
		document.querySelector(`.js-cart-item-container-${id}`).classList.add('is-editing-quantity');
	})
} )

function handleUpdateQuantity(id, newQuantity) {
	//validates quantity
	if (newQuantity > 0 && newQuantity < 100) {
		updateQuantity(id, newQuantity);
		// update quanitity in cart item container
		document.querySelector(`.js-quantity-label-${id}`).innerHTML = newQuantity;

		// update quanitity in checkout header
		updateCheckoutQuantity();
	} else {
		alert('Invalid Quantity.\nMust be greater than 0 and less than 1000.');
	}
}

document.querySelectorAll('.js-save-quantity-link').forEach( (saveLink) => {
	saveLink.addEventListener('click', () => {
		const id = saveLink.dataset.productId;
		document.querySelector(`.js-cart-item-container-${id}`).classList.remove('is-editing-quantity');
		// updates quantity
		const newQuantity = Number(document.querySelector(`.js-quantity-input-${id}`).value);
		handleUpdateQuantity(id, newQuantity);
		
	});	
});

document.addEventListener('keydown', () => {
	if (event.key === 'Enter') {
		handleUpdateQuantity(id, newQuantity);
	}
})
