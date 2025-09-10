// Will store product object in this array
import { deliveryOptions } from "./deliveryOptions.js";

class Cart {
    cartItems;
    localStorageKey;

    // constructor method
    constructor(key) {
        this.localStorageKey = key;
        this.loadFromStorage();
    }

    // will either assign [] or current cart contents to cart array when page is reloaded
  
    loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) || [
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: 1,
            }, {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: 2,
            }
        ];
    }

    // saves cart's contents to local storage
    saveToStorage() {
        localStorage.setItem(this.localStorageKey,JSON.stringify(this.cartItems));
    }

        // adds product along with ots quantity to cart
    addToCart (productId, quantity) {
        let inCart = false;

        // Checks if product is already in cart
        this.cartItems.forEach(cartItem => {
            if (cartItem.productId === productId) {
            // If so quantity is incremented
            cartItem.quantity+= quantity;
            inCart = true;
            } 
        });

        // If not in cart a new object is added to cart array
        if (!inCart) {
            this.cartItems.push({
                productId,
                quantity,
                // default option
                deliveryOptionId: 1,
            });
        };
        this.saveToStorage();
    }

    removeFromCart(productId) {
    // uses .filter() to remove an item from cart 
    this.cartItems = this.cartItems.filter( (cartItem) => {
        if (cartItem.productId === productId ) {
            return false;   
        } return true;
    });
    this.saveToStorage();
    }
    
    calculateCartQuantity() {
    let totalQuantity = 0;
        this.cartItems.forEach( cartItem => {
            totalQuantity += cartItem.quantity;
        })
    return totalQuantity;
    }


    updateQuantity(productId, newQuantity) {
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId === productId) {
            cartItem.quantity = newQuantity;
            }
        })
        this.saveToStorage();
    }


    updateDeliveryOption(productId, deliveryOptionId) {
        let found = false;

        // if item is in cart update delivery option
        if (validDeliveryOptions(deliveryOptionId)) {
            this.cartItems.forEach((cartItem) => {
            if (cartItem.productId === productId) {
                cartItem.deliveryOptionId = deliveryOptionId;
                found = true
            }
            })
        }

        if (found) {
            this.saveToStorage();
        } return;

    }


    validDeliveryOptions(deliveryOptionNum) {
        let found = false;
        deliveryOptions.forEach( (option) => {
            if (option.id === deliveryOptionNum) {
            found = true;
            }
        })
        return found;
    }
    
}
















