import { createContext, useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";

export const CartContext = createContext({
    items: [],
    addItemToCart: () => {},
    updateItemQuantity: () => {}
});


/**
 * A shopping cart reducer function that updates the state based on the given action.
 *
 * @param {object} state - The current state of the shopping cart.
 * @param {object} action - The action object that contains the type and payload for updating the state.
 * @return {object} The updated state after processing the action.
 */
function shoppingCartReducer(state, action) {
    if (action.type === "ADD_ITEM_TO_CART") {
        const updatedItems = [...state.items];

        const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === action.payload
        );
        const existingCartItem = updatedItems[existingCartItemIndex];

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload);
            updatedItems.push({
                id: action.payload,
                name: product.title,
                price: product.price,
                quantity: 1,
            });
        }

        return {
            ...state, // Not technically needed as only one value is present, but good practice to not lose data for more complex cases.
            items: updatedItems,
        };      
    }
    
    if (action.type == 'UPDATE_ITEM_QUANTITY') {
        const updatedItems = [...state.items];
        const updatedItemIndex = updatedItems.findIndex(
            (item) => item.id === action.payload.productId
        );

        const updatedItem = {
            ...updatedItems[updatedItemIndex],
        };

        updatedItem.quantity += action.payload.amount;

        if (updatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
        } else {
            updatedItems[updatedItemIndex] = updatedItem;
        }

        return {
            ...state,
            items: updatedItems,
        };
    }

    return state;
}

export default function CartContextProvider({ children }) {
    const [shoppingCartState, shoppingCartDispatch] = useReducer(
        shoppingCartReducer, 
        {
            items: [],
        }
    );

    /**
     * Updates the shopping cart by adding an item with the given id, or incrementing the quantity if the item already exists.
     *
     * @param {type} id - The id of the item to be added to the cart
     * @return {type} An object representing the updated shopping cart
     */
    function handleAddItemToCart(id) {
        shoppingCartDispatch({
            type: "ADD_ITEM_TO_CART",
            payload: id
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
        shoppingCartDispatch({
            type: "UPDATE_ITEM_QUANTITY",
            payload: {
                productId: productId,
                amount: amount,
            }
        })
    }


    const contextValue = {
        items: shoppingCartState.items,
        addItemToCart: handleAddItemToCart,
        updateItemQuantity: handleUpdateCartItemQuantity,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
}