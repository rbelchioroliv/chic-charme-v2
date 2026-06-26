import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  price: number;
  promotionalPrice?: number | null;
  category: string;
  imageUrl: string;
  description?: string | null;
  material?: string | null;
  plating?: string | null;
  warranty?: string | null;
  isHypoallergenic?: boolean | null;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean; // Controla se o carrinho lateral está visível
  toggleCart: () => void;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (product) => set((state) => {
        const existingItem = state.items.find(item => item.id === product.id);
        // Já abre o carrinho ao adicionar algo
        if (existingItem) {
          return {
            isOpen: true,
            items: state.items.map(item =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            )
          };
        }
        return { isOpen: true, items: [...state.items, { ...product, quantity: 1 }] };
      }),

      removeItem: (productId) => set((state) => ({
        items: state.items.filter(item => item.id !== productId)
      })),

      updateQuantity: (productId, quantity) => set((state) => ({
        items: state.items.map(item =>
          item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
        )
      })),

      clearCart: () => set({ items: [] }),

      getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const currentPrice = item.promotionalPrice ? item.promotionalPrice : item.price;
          return total + (currentPrice * item.quantity);
        }, 0);
      },
    }),
    {
      name: 'chic-charme-cart-v2',
      // Não persiste o estado de "aberto/fechado" quando o usuário recarrega a página
      partialize: (state) => ({ items: state.items })
    }
  )
);