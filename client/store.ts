import { create } from 'zustand';

export interface MenuItem {
    itemId: number;
    name: string;
    price: number;
    desc: string;
}

interface CartItem extends MenuItem {
    quantity: number;
}

interface CartState {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    updateQuantity: (id: number, quantity: number) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
}

export const useCartStore= create<CartState>((set) => ({
    cart: [],
    addToCart: (item) =>
        set((state) => {
        const existingItem = state.cart.find((i) => i.itemId === item.itemId);
        if (existingItem) {
            return {
            cart: state.cart.map((i) =>
                i.itemId === item.itemId ? { ...i, quantity: i.quantity + item.quantity } : i
            ),
            };
        }
        return { cart: [...state.cart, { ...item }] };
        }),
    updateQuantity: (id, quantity) =>
        set((state) => ({
        cart: state.cart.map((item) =>
            item.itemId === id ? { ...item, quantity } : item
        ),
        })),    
    removeFromCart: (id) =>
        set((state) => ({
        cart: state.cart.filter((item) => item.itemId !== id),
        })),
    clearCart: () => set({ cart: [] }),
}));    

interface ItemState extends MenuItem {
    setItem: (item: MenuItem) => void;
}

export const useItemStore = create<ItemState>((set) => ({
    itemId: 0,
    name: '',
    price: 0,
    desc: '',
    setItem: (item: MenuItem) => set(() => ({...item}))
}));    

interface MenuState {
    menu: MenuItem[];
    setMenu: (menu: MenuItem[]) => void;
    clearMenu: () => void;
}

export const useMenuStore = create<MenuState>((set) => ({
    menu: [],
    setMenu: (menu) => set(() => ({ menu })),
    clearMenu: () => set({ menu: [] }),
}));

