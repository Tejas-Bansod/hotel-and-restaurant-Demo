import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartStore {
    items: CartItem[];
    isCartOpen: boolean;
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    getTotalPrice: () => number;
    getTotalItems: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            isCartOpen: false,

            addItem: (item) => {
                const existingItem = get().items.find((i) => i.productId === item.productId);

                if (existingItem) {
                    set({
                        items: get().items.map((i) =>
                            i.productId === item.productId
                                ? { ...i, quantity: i.quantity + 1 }
                                : i
                        ),
                    });
                } else {
                    set({ items: [...get().items, { ...item, quantity: 1 }] });
                }
            },

            removeItem: (productId) => {
                set({ items: get().items.filter((i) => i.productId !== productId) });
            },

            updateQuantity: (productId, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(productId);
                } else {
                    set({
                        items: get().items.map((i) =>
                            i.productId === productId ? { ...i, quantity } : i
                        ),
                    });
                }
            },

            clearCart: () => {
                set({ items: [] });
            },

            toggleCart: () => {
                set({ isCartOpen: !get().isCartOpen });
            },

            getTotalPrice: () => {
                return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
            },

            getTotalItems: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },
        }),
        {
            name: 'cart-storage',
        }
    )
);
