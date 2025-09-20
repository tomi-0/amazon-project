import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts, products } from "../data/products.js";

new Promise((resolve) => {
    loadProducts( () => {
        resolve(products);
    });
}).then( (loadedProducts) => {
    renderCheckoutHeader();
    renderOrderSummary(loadedProducts);
    renderPaymentSummary(loadedProducts);  
})


