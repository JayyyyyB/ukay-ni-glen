import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; size: string } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string; size: string } }
  | { type: 'UPDATE_QTY'; payload: { productId: string; size: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'OPEN_CART' };

interface CartContextType {
  state: CartState;
  addItem: (product: Product, size: string) => void;
  removeItem: (productId: string, size: string) => void;
  updateQty: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  closeCart: () => void;
  openCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, size } = action.payload;
      const existing = state.items.find(
        (i) => i.product.id === product.id && i.size === size
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.product.id === product.id && i.size === size
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, { product, size, quantity: 1 }] };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          (i) => !(i.product.id === action.payload.productId && i.size === action.payload.size)
        ),
      };
    case 'UPDATE_QTY':
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (i) => !(i.product.id === action.payload.productId && i.size === action.payload.size)
          ),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.payload.productId && i.size === action.payload.size
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    case 'CLOSE_CART':
      return { ...state, isOpen: false };
    case 'OPEN_CART':
      return { ...state, isOpen: true };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        state,
        addItem: (product, size) => dispatch({ type: 'ADD_ITEM', payload: { product, size } }),
        removeItem: (productId, size) => dispatch({ type: 'REMOVE_ITEM', payload: { productId, size } }),
        updateQty: (productId, size, quantity) => dispatch({ type: 'UPDATE_QTY', payload: { productId, size, quantity } }),
        clearCart: () => dispatch({ type: 'CLEAR_CART' }),
        toggleCart: () => dispatch({ type: 'TOGGLE_CART' }),
        closeCart: () => dispatch({ type: 'CLOSE_CART' }),
        openCart: () => dispatch({ type: 'OPEN_CART' }),
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
