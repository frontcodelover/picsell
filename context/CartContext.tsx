import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';

// Type pour un produit dans le panier
type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

// Type pour les valeurs du contexte
type CartContextType = {
  cartItems: CartItem[];
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (id: number) => void;
  clearCart: () => void;
};

// Valeur par défaut pour le contexte
const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart doit être utilisé à l'intérieur de CartProvider");
  }
  return context;
};

// Composant Provider
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cartItems');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Fonction pour ajouter un article au panier
  const addItemToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        // Si l'article est déjà dans le panier, on met à jour la quantité
        return prevItems.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i));
      } else {
        // Sinon, on ajoute l'article au panier
        return [...prevItems, item];
      }
    });
  };

  // Fonction pour supprimer un article du panier
  const removeItemFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Fonction pour vider le panier
  const clearCart = () => {
		setCartItems([]);
		localStorage.removeItem('cartItems');
  };

  return <CartContext.Provider value={{ cartItems, addItemToCart, removeItemFromCart, clearCart }}>{children}</CartContext.Provider>;
};
