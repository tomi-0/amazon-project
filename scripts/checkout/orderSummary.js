import { cart,removeFromCart,calculateCartQuantity,updateQuantity,updateDeliveryOption } from '../../data/cart.js';
import { products, getProduct } from '../../data//products.js';
import { formatCurrency } from '../utils/money.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { renderPaymentSummary } from './paymentSummary.js';

// For each item in cart it will generate HTML code
export function renderOrderSummary() {
	let generatedHTML = '';

	cart.forEach( cartItem => {
		// finds matching product
		let productElement = getProduct(cartItem.productId);

		// need to convert deliveryOptionId into a number each time
		const deliveryOptionId = Number(cartItem.deliveryOptionId);
		// finds delivery option object
		const deliveryOpt = getDeliveryOption(deliveryOptionId);


		const today = dayjs();
		const deliveryDate = today.add(
			deliveryOpt.deliveryDays,
			'days');
		// formats delivery date
		const dateString = deliveryDate.format('dddd, MMM, D');

		generatedHTML += `
				<div class="cart-item-container js-cart-item-container-${productElement.id}">
				<div class="delivery-date">
				Delivery Date: ${dateString}
			</div>

						<div class="cart-item-details-grid">
							<img class="product-image"
								src="${productElement.image}">

							<div class="cart-item-details">
								<div class="product-name">
									${productElement.name}
								</div>
								<div class="product-price">
									$${formatCurrency(productElement.priceCents)}
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
								${deliveryOptionsHTML(productElement, cartItem)}
							</div>
						</div>
					</div>
		`;
		
	} )



	// Generates HTML for delivery options 
	function deliveryOptionsHTML(productElement, cartItem) {
		let generatedHTML = '';

		// Lopps through delivery options to find number of days
		deliveryOptions.forEach((deliveryOption) => {
			const today = dayjs();
			const deliveryDate = today.add(
				deliveryOption.deliveryDays,
				'days');
			// formats delivery date
			const dateString = deliveryDate.format('dddd, MMM, D');
			const priceString = deliveryOption.priceCents === 0 ?
				'FREE Shiping' :
				`$${formatCurrency(deliveryOption.priceCents)} - Shipping`;

			// will check the default of the radios
			const isChecked = deliveryOption.id === Number(cartItem.deliveryOptionId);

			generatedHTML += `
				<div class="delivery-option js-delivery-option" data-product-id="${productElement.id}" data-delivery-option-id="${deliveryOption.id}">
					<input type="radio" 
					${isChecked ? 'checked' : ''}
					class="delivery-option-input"
						name="delivery-option-${productElement.id}"
						>
					<div>
						<div class="delivery-option-date">
							${dateString}
						</div>
						<div class="delivery-option-price">
							${priceString}
						</div>
					</div>
				</div>
			`;
			
		})
		return generatedHTML;
	};

	document.querySelector('.js-order-summary')
	.innerHTML = generatedHTML;



	// Will remove an item if the delete link in clicked
	document.querySelectorAll('.js-delete-quantity-link').forEach( (deleteLink) => {
			// removes item from cart
		deleteLink.addEventListener('click', () => {
				const id = deleteLink.dataset.productId;
				removeFromCart(id);

				// removes item from web page by reloading webpage contents automatically
				renderOrderSummary();
				updateCheckoutQuantity();
				renderPaymentSummary();
		});
	});



	// Will update checkout number let totalQuantity = 0;
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
			renderPaymentSummary();
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

	// will update once enter is pressed
	document.addEventListener('keydown', () => {
		if (event.key === 'Enter') {
			handleUpdateQuantity(id, newQuantity);
		}
	})

	// add event listeners to each delivery option and update delivery date
	document.querySelectorAll('.js-delivery-option').forEach((element) => {
		element.addEventListener('click', () => {
			const { productId, deliveryOptionId } = element.dataset;
			
			updateDeliveryOption(productId, deliveryOptionId);
			renderOrderSummary();
			renderPaymentSummary();
		}) 
	});
};

renderOrderSummary();
