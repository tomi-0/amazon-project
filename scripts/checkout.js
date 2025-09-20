import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProductsFetch, products } from "../data/products.js";

loadProductsFetch().then( () => {
    renderOrderSummary();
    renderPaymentSummary(); 
    renderCheckoutHeader();
})


