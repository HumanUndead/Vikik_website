import React from "react";
import { cartReducer, State, initialState } from "./cart.reducer";
import { getItem } from "./cart.utils";
import { useLocalStorage } from "@utils/use-local-storage";
import { Product } from "src/api/type";
interface CartProviderState extends State {
  addItemToCart: (item: Product, quantity: number) => void;
  removeItemFromCart: (id: Product["ID"]) => void;
  // updateItem: (id: Item["id"], payload: object) => void;
  // updateItemQuantity: (id: Item["id"], quantity: number) => void;
  clearItemFromCart: (id: Product["ID"]) => void;
  getItemFromCart: (id: Product["ID"]) => any | undefined;
  isInCart: (id: Product["ID"]) => boolean;
  // updateCartMetadata: (metadata: Metadata) => void;
}
export const cartContext = React.createContext<CartProviderState | undefined>(
  undefined
);

cartContext.displayName = "CartContext";

export const useCart = () => {
  const context = React.useContext(cartContext);
  if (context === undefined) {
    throw new Error(`useCart must be used within a CartProvider`);
  }
  return context;
};

export const CartProvider: React.FC = (props) => {
  const [savedCart, saveCart] = useLocalStorage(
    `vikik-cart`,
    JSON.stringify(initialState)
  );

  const [state, dispatch] = React.useReducer(
    cartReducer,
    JSON.parse(savedCart!)
  );

  React.useEffect(() => {
    saveCart(JSON.stringify(state));
  }, [state, saveCart]);

  const addItemToCart = (item: Product, quantity: number) =>
    dispatch({ type: "ADD_ITEM_WITH_QUANTITY", item, quantity });
  const removeItemFromCart = (id: Product["ID"]) =>
    dispatch({ type: "REMOVE_ITEM_OR_QUANTITY", id });
  const clearItemFromCart = (id: Product["ID"]) =>
    dispatch({ type: "REMOVE_ITEM", id });
  const isInCart = (id: Product["ID"]) => !!getItem(state.items, id);
  const getItemFromCart = (id: Product["ID"]) => getItem(state.items, id);

  // const inStock=()=>{}
  const value = React.useMemo(
    () => ({
      ...state,
      addItemToCart,
      removeItemFromCart,
      clearItemFromCart,
      getItemFromCart,
      isInCart,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]
  );
  return <cartContext.Provider value={value} {...props} />;
};
