import { FC } from 'react';
import ProductItem from './ProductItem';

const ProductList: FC<any> = ({ products, onBack, onAddToCart, onReturnToCategories }) => {
  return (
    <div>
    <button
    onClick={onBack}
    className="px-3 py-1 bg-gray-300 text-black rounded hover:bg-gray-400 transition"
  >
    Voltar
  </button>
    <div className="flex flex-col items-center">

      <ul className="mt-4 space-y-4 "> {/* Espaço entre os itens da lista */}
        {products.map((product: any) => (
          <li key={product.id}>
            <ProductItem
              product={product}
              onAddToCart={onAddToCart}
              onReturnToCategories={onReturnToCategories}
            />
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default ProductList;
