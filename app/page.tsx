"use client";

import { useState } from 'react';
import products from './data/products';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import CategoryList from './components/CategoryList';
import Estimate from './components/Estimate';
import SearchBar from './components/SearchBar';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);

  const uniqueCategories = Array.from(new Set(Object.values(products).map((p) => p.category)));

  const handleAddToCart = (product: any) => {
    const existingItem = cartItems.find((item) => item.id === product.id); // Procurar item pelo id
  
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]); // Adicionar novo item
    }
  
    setSelectedCategory(null); // Voltar para a lista de categorias após adicionar
  };
  

  const handleIncreaseQuantity = (itemId: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (itemId: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const handleRemoveItem = (itemId: number) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  return (
    <main className="container mx-auto p-2"> {/* Centraliza o conteúdo */}

      {selectedCategory ? (
        <>
          <ProductList
            products={Object.values(products).filter((p) => p.category === selectedCategory)}
            onBack={() => setSelectedCategory(null)}
            onAddToCart={handleAddToCart}
            onReturnToCategories={() => setSelectedCategory(null)}
          />
          <Cart
            cartItems={cartItems}
            onIncreaseQuantity={handleIncreaseQuantity}
            onDecreaseQuantity={handleDecreaseQuantity}
            onRemoveItem={handleRemoveItem}
            
          />
        </>
      ) : (
        <>
          <CategoryList
            categories={uniqueCategories}
            onSelectCategory={setSelectedCategory}
          />
          <SearchBar onProductSelect={handleAddToCart} />
                    <Estimate cartItems={cartItems} />

          <Cart
            cartItems={cartItems}
            onIncreaseQuantity={handleIncreaseQuantity}
            onDecreaseQuantity={handleDecreaseQuantity}
            onRemoveItem={handleRemoveItem}
          />
        </>
      )}
    </main>
  );
}