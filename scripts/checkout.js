import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProductsFetch, products } from "../data/products.js";

async function loadPage() {
    try {
        await loadProductsFetch();

        renderOrderSummary();
        renderPaymentSummary(); 
        renderCheckoutHeader();
    } catch (error) {
        console.log('Unexpected Error. Please try again later.')
    }
    
}

loadPage();


