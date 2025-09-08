import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { cart, loadFromStorage } from '../../data/cart.js';

describe('test suite: renderOrderSummary', () => {

    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

    // hook for setup code
    beforeEach( () => {
        // mocks the setItem method - to do nothing
        spyOn(localStorage, 'setItem');

        // adds required classes to webpage to test
        document.querySelector('.js-test-container').innerHTML= `
            <div class="js-order-summary"></div>
            <div class="js-payment-summary"></div>
            <div class="js-checkout-header"></div>
        `;

        // loads cart and alters getItem method
        spyOn(localStorage,'getItem').and.callFake( () => { return JSON.stringify([ {
            productId: productId1,
            quantity: 2,
            deliveryOption: 1,
        }, {
            productId: productId2,
            quantity: 1,
            deliveryOption: 2,
        }
        ])});
        loadFromStorage();

        renderOrderSummary();
    })

    it('displays the cart', () => {
        // checks there are 2 items in cart
        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(2);

        // checks that quantities of both items are correct
        expect(
            document.querySelector(`.js-quantity-label-${productId1}`).innerHTML
        ).toContain('2');
        expect(
            document.querySelector(`.js-quantity-label-${productId2}`).innerHTML
        ).toContain('1');

        // removes HTML from page
        document.querySelector('.js-test-container').innerHTML="";
    })



    it('removes an item from visible cart', () => {
        document.querySelector(`.js-delete-link-${productId1}`).click();

        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(1);
        expect(
            document.querySelector(`.js-cart-item-container-${productId1}`)
        ).toEqual(null);
        expect(
            document.querySelector(`.js-cart-item-container-${productId2}`)
        ).not.toEqual(null);

        // need to ensure cart has been updated
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2);

        // removes HTML from page
        document.querySelector('.js-test-container').innerHTML="";
    })
});