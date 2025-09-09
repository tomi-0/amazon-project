import {addToCart,cart,loadFromStorage} from '../../data/cart.js';

describe('test suite: addToCart', () => {
    beforeEach( () => {
        // alters setItem method
         spyOn(localStorage, 'setItem');
    })

    it('add new product to cart', () => {
        // alters getItem method
        spyOn(localStorage,'getItem').and.callFake( () => { return JSON.stringify([])});
        loadFromStorage();


        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
        expect(cart.length).toEqual(1);
        //checks if saved to local storage
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify( [{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: 1,
        }] ))
    });

    it('adds existsing product to cart', () => {
        spyOn(localStorage,'getItem').and.callFake( () => { return JSON.stringify([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: 1,
        }])});
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
        expect(cart[0].quantity).toEqual(2);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify( [{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: 1,
        }] ))
    });
})