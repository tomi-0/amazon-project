import {addToCart,cart,loadFromStorage} from '../../data/cart.js';

describe('test suite: addToCart', () => {
    it('adds existsing product to cart', () => {
        spyOn(localStorage, 'setItem');
        spyOn(localStorage,'getItem').and.callFake( () => { return JSON.stringify([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOption: 1,
        }])});
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
        expect(cart[0].quantity).toEqual(2);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    });

    it('add new product to cart', () => {
        // alters setItem method
        spyOn(localStorage, 'setItem');

        // alters getItem method
        spyOn(localStorage,'getItem').and.callFake( () => { return JSON.stringify([])});
        loadFromStorage();


        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
        expect(cart.length).toEqual(1);
        //checks if saved to local storage
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
    });
})