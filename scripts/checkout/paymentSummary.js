import { cart } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";

export function renderPaymentSummary () {

    let totalItemPrice = 0;
    let totalShippingPrice = 0;
    let totalQuantity = 0;
    cart.forEach( (cartItem) => {
        // finds matching product
        const productElement = getProduct(cartItem.productId);

        totalItemPrice +=  productElement.priceCents * cartItem.quantity;

        totalShippingPrice += getDeliveryOption(Number(cartItem.deliveryOptionId)).priceCents;

        totalQuantity += cartItem.quantity;
    });
    
    const totalBeforeTax = totalItemPrice + totalShippingPrice;
    const estimatedTax = totalBeforeTax * 0.1;
    const totalPriceCents = totalBeforeTax + estimatedTax;

    const paymentSummaryHTML = `
        <div class="payment-summary-title">
        Order Summary
        </div>

        <div class="payment-summary-row">
        <div>Items (${totalQuantity}):</div>
        <div class="payment-summary-money">$${formatCurrency(totalItemPrice)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money js-shipping-price">$${formatCurrency(totalShippingPrice)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCurrency(estimatedTax)}</div>
        </div>

        <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money js-total-price">$${formatCurrency(totalPriceCents)}</div>
        </div>

        <button class="place-order-button button-primary">
        Place your order
        </button>
    `;

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}