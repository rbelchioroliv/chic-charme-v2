import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
}

interface ProductStore {
  products: Product[];
  isLoading: boolean;
  fetchProducts: () => Promise<void>;
  addProduct: (formData: FormData) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  isLoading: false,

  fetchProducts: async () => {
    set({ isLoading: true });
    const res = await fetch('/api/produtos');
    const data = await res.json();
    set({ products: data, isLoading: false });
  },

  addProduct: async (formData) => {
    const res = await fetch('/api/produtos', { method: 'POST', body: formData });
    if (res.ok) {
      const newProduct = await res.json();
      set((state) => ({ products: [newProduct, ...state.products] }));
    }
  },

  // Adicione esta função dentro do seu useProductStore
updateProduct: async (id: string, formData: FormData) => {
  try {
    const res = await fetch(`/api/produtos/${id}`, {
      method: 'PUT',
      body: formData
    });
    if (!res.ok) throw new Error("Erro ao atualizar");
    const updatedProduct = await res.json();
    
    set((state) => ({
      products: state.products.map(p => p.id === id ? updatedProduct : p)
    }));
  } catch (error) {
    console.error(error);
  }
},

  deleteProduct: async (id) => {
    await fetch(`/api/produtos/${id}`, { method: 'DELETE' });
    set((state) => ({ products: state.products.filter(p => p.id !== id) }));
  }
}));