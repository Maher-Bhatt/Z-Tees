import { createContext, useCallback, useContext, useEffect, useReducer, type ReactNode } from 'react';
import { getProductById, isSizeAvailable, type Product } from '@/data/products';

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface CartItem {
  cartId: string;
  product: Product;
  size: string;
  qty: number;
}

interface CartState {
  cart: CartItem[];
}

type CartAction =
  | { type: 'ADD';    product: Product; size: string }
  | { type: 'UPDATE'; cartId: string;   qty: number  }
  | { type: 'REMOVE'; cartId: string                 }
  | { type: 'CLEAR'                                  }
  | { type: 'HYDRATE'; cart: CartItem[]              };

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: string) => void;
  updateQty: (cartId: string, qty: number) => void;
  removeItem: (cartId: string) => void;
  clearCart: () => void;
  totalItems: number;
}

// ─── Reducer (pure — easy to test) ───────────────────────────────────────────

const STORAGE_KEY = 'ztees_cart_v1';

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'HYDRATE':
      return { cart: action.cart };

    case 'ADD': {
      if (!isSizeAvailable(action.product, action.size)) return state;
      const existing = state.cart.find(
        item => item.product.id === action.product.id && item.size === action.size,
      );
      if (existing) {
        return {
          cart: state.cart.map(item =>
            item.cartId === existing.cartId ? { ...item, qty: item.qty + 1 } : item,
          ),
        };
      }
      return {
        cart: [
          ...state.cart,
          { cartId: `${Date.now()}-${Math.random()}`, product: action.product, size: action.size, qty: 1 },
        ],
      };
    }

    case 'UPDATE':
      if (action.qty < 1) return { cart: state.cart.filter(item => item.cartId !== action.cartId) };
      return { cart: state.cart.map(item => (item.cartId === action.cartId ? { ...item, qty: action.qty } : item)) };

    case 'REMOVE':
      return { cart: state.cart.filter(item => item.cartId !== action.cartId) };

    case 'CLEAR':
      return { cart: [] };

    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { cart: [] });

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[];
        if (Array.isArray(parsed)) {
          const validCart = parsed
            .map(item => {
              const currentProduct = getProductById(item.product?.id ?? '');
              if (!currentProduct || !isSizeAvailable(currentProduct, item.size)) return null;
              return {
                ...item,
                product: currentProduct,
                qty: Number.isFinite(item.qty) && item.qty > 0 ? item.qty : 1,
              };
            })
            .filter((item): item is CartItem => item !== null);
          dispatch({ type: 'HYDRATE', cart: validCart });
        }
      }
    } catch {
      // Corrupt storage — start fresh
    }
  }, []);

  // Persist to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cart));
    } catch {
      // Storage full or unavailable — silently ignore
    }
  }, [state.cart]);

  const addToCart  = useCallback((product: Product, size: string) => dispatch({ type: 'ADD', product, size }), []);
  const updateQty  = useCallback((cartId: string, qty: number)    => dispatch({ type: 'UPDATE', cartId, qty }), []);
  const removeItem = useCallback((cartId: string)                 => dispatch({ type: 'REMOVE', cartId }), []);
  const clearCart  = useCallback(()                               => dispatch({ type: 'CLEAR' }), []);

  const totalItems = state.cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider value={{ cart: state.cart, addToCart, updateQty, removeItem, clearCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within <CartProvider>');
  return ctx;
}
