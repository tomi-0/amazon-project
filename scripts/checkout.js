import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import '../data/backendPractice.js'

renderCheckoutHeader();
renderOrderSummary();
renderPaymentSummary();
