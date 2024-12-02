// src/redux/reducer.js
import { ADD_TO_CART, REMOVE_FROM_CART, INCREASE_QUANTITY, DECREASE_QUANTITY } from './ActionType';

const initialState = {
  cart: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // Check if the product is already in the cart, if so, increase quantity, else add a new product
      const existingProductIndex = state.cart.findIndex((item) => item.name === action.payload.name);
      if (existingProductIndex >= 0) {
        // Product already in the cart, update quantity
        const updatedCart = [...state.cart];
        updatedCart[existingProductIndex].quantity += action.payload.quantity;
        return { ...state, cart: updatedCart };
      }
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    case REMOVE_FROM_CART:
      // Remove product from cart
      return {
        ...state,
        cart: state.cart.filter((product) => product.name !== action.payload.name),
      };

    case INCREASE_QUANTITY:
      // Increase the quantity of a specific product
      return {
        ...state,
        cart: state.cart.map((product) =>
          product.name === action.payload.name
            ? { ...product, quantity: product.quantity + 1 }
            : product
        ),
      };

    case DECREASE_QUANTITY:
      // Decrease the quantity of a specific product
      return {
        ...state,
        cart: state.cart.map((product) =>
          product.name === action.payload.name && product.quantity > 1
            ? { ...product, quantity: product.quantity - 1 }
            : product
        ),
      };

    default:
      return state;
  }
};

export default reducer;
