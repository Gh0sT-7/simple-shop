import { useState } from 'react';

import Header from './components/Header/Header.jsx';
import Shop from './components/Shop/Shop.jsx';
import { DUMMY_PRODUCTS } from './dummy-products.js';

function App() {
    const [shoppingCart, setShoppingCart] = useState({
        items: [],
    });

    /**
     * Updates the shopping cart by adding an item with the given id, or incrementing the quantity if the item already exists.
     *
     * @param {type} id - The id of the item to be added to the cart
     * @return {type} An object representing the updated shopping cart
     */
    function handleAddItemToCart(id) {
        setShoppingCart((prevShoppingCart) => {
            const updatedItems = [...prevShoppingCart.items];

            const existingCartItemIndex = updatedItems.findIndex(
                (cartItem) => cartItem.id === id
            );
            const existingCartItem = updatedItems[existingCartItemIndex];

            if (existingCartItem) {
                const updatedItem = {
                    ...existingCartItem,
                    quantity: existingCartItem.quantity + 1,
                };
                updatedItems[existingCartItemIndex] = updatedItem;
            } else {
                const product = DUMMY_PRODUCTS.find((product) => product.id === id);
                updatedItems.push({
                    id: id,
                    name: product.title,
                    price: product.price,
                    quantity: 1,
                });
            }

            return {
                items: updatedItems,
            };
        });
    }

    /**
     * Updates the quantity of a cart item.
     *
     * @param {string} productId - The ID of the product to update.
     * @param {number} amount - The amount to update the quantity by.
     * @return {void} This function does not return a value.
     */
    function handleUpdateCartItemQuantity(productId, amount) {
        setShoppingCart((prevShoppingCart) => {
            const updatedItems = [...prevShoppingCart.items];
            const updatedItemIndex = updatedItems.findIndex(
                (item) => item.id === productId
            );

            const updatedItem = {
                ...updatedItems[updatedItemIndex],
            };

            updatedItem.quantity += amount;

            if (updatedItem.quantity <= 0) {
                updatedItems.splice(updatedItemIndex, 1);
            } else {
                updatedItems[updatedItemIndex] = updatedItem;
            }

            return {
                items: updatedItems,
            };
        });
    }

    return (
        <>
            <Header
                cart={shoppingCart}
                onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
            />
            <Shop onAddItemToCart={handleAddItemToCart} />
        </>
    );
}

export default App;

