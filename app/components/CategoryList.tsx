import { FC } from 'react';
import SearchBar from './SearchBar';


const CategoryList: FC<any> = ({ categories, onSelectCategory, onProductSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6"> {/* Estilo do quadro */}
      <h2 className="text-xl font-semibold mb-4">Selecione uma Categoria</h2>
      <div className="flex flex-wrap gap-4">
        {categories.map((category:any) => (
          <div
            key={category}
            className="bg-gray-200 p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-300 transition"
            onClick={() => onSelectCategory(category)}
          >
            <div className="text-center">{category}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
