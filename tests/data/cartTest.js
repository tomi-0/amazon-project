import {addToCart,cart,loadFromStorage, removeFromCart} from '../../data/cart.js';

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

    it('adds existing product to cart', () => {
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

describe('test suite: removeFromCart', () => {

    let productId = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';

    beforeEach( () => {
        // mock ups for local storage
        spyOn(localStorage, 'setItem');

        spyOn(localStorage,'getItem').and.callFake( () => { return JSON.stringify([{
            productId,
            quantity: 1,
            deliveryOptionId: 1,
        }])});
        loadFromStorage();
    })

    it('remove a productId that is in cart', () => {
        removeFromCart(productId);
        // check cart behaviour
        expect(cart.length).toEqual(0);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart',
            JSON.stringify([])
        );
        // check cart looks correct
        expect(cart[0]).toEqual(undefined);
    })

    it('remove a productId that is not in cart', () => {
        removeFromCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');
        // check cart behaviour
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart',
            JSON.stringify([{
                productId,
                quantity: 1,
                deliveryOptionId: 1,
            }])
        );
        // check cart looks correct
        expect(cart[0].productId).toEqual(productId);
        expect(cart[0].quantity).toEqual(1);
    })
})