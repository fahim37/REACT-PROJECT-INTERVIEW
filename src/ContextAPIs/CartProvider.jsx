import { createContext, useReducer } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

const initialCartState = {
  cartItems: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      if (state.cartItems.length > 0) {
        toast.warn("You can only add one item to the cart.");
        return state;
      } else {
        return {
          ...state,
          cartItems: [{ ...action.payload, quantity: 1 }],
        };
      }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    case "INCREASE_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case "DECREASE_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    case "CLEAR":
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  return (
    <CartContext.Provider value={{ cartItems: state.cartItems, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
