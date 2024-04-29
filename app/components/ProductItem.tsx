import { FC } from 'react';

const ProductItem: FC<any> = ({ product, onAddToCart, onReturnToCategories }) => {
  const handleAddToCart = () => {
    onAddToCart(product); 
    onReturnToCategories(); 
  };

  return (
    <div
      className="px-4 py-3 border border-green-500 rounded-lg cursor-pointer hover:bg-green-100 transition"
      onClick={handleAddToCart}
    >
      {product.name} {/* Nome do produto */}
    </div>
  );
};

export default ProductItem;
