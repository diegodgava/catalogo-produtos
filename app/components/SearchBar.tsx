import { FC, useState, ChangeEvent } from 'react';
import products from '../data/products'; // Importar todos os produtos da base

const SearchBar: FC<any> = ({ onProductSelect }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value); // Atualizar o termo de busca ao digitar
  };

  const filteredProducts = Object.values(products).filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative mt-5"> {/* Para posicionamento da lista suspensa */}
      {/* Texto antes da barra de busca */}
      <p className="text-sm text-gray-600 mb-2 font-semibold">Ou busque um produto</p>

      {/* Barra de busca */}
      <input
        type="text"
        placeholder="Buscar produtos..."
        className="w-full p-2 border rounded-lg shadow-sm"
        onChange={handleInputChange}
        value={searchTerm}
      />

      {/* Lista suspensa de resultados */}
      {searchTerm && (
        <ul
          className="absolute top-full left-0 right-0 bg-white border rounded-lg shadow-lg z-index-10 max-h-48 overflow-y-auto" 
        >
          {filteredProducts.map((product:any) => (
            <li
              key={product.id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onProductSelect(product); // Ação ao selecionar um produto
                setSearchTerm(''); // Limpar a barra de busca
              }}
            >
              {product.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
