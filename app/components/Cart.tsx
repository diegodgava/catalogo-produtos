import { FC } from 'react';

const Cart: FC<any> = ({ cartItems, onIncreaseQuantity, onDecreaseQuantity, onRemoveItem }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-3"> {/* Estilo do contêiner */}
      {cartItems.length === 0 ? (
        <p>Selecione algum produto.</p>
      ) : (
        <ul>
          {cartItems.map((item: any) => (
            <li key={item.id} className="mb-6"> {/* Espaço entre os itens */}
              <div className="flex items-center justify-between"> {/* Nome do item e controle de quantidade */}
                <span className="flex-1">{item.name}</span> {/* Nome do item */}
                <div className="flex items-center"> {/* Controles de quantidade */}
  <button
    className="px-2 py-1 border border-red-500 rounded-full text-red-500 hover:bg-red-100 transition" // Borda vermelha para reduzir
    onClick={() => onDecreaseQuantity(item.id)}
    disabled={item.quantity <= 1} // Desativar se a quantidade for 1
  >
    -
  </button>
  <span className="px-4">{item.quantity}</span> {/* Valor da quantidade */}
  <button
    className="px-2 py-1 border border-green-500 rounded-full text-green-500 hover:bg-green-100 transition" // Borda verde para aumentar
    onClick={() => onIncreaseQuantity(item.id)}
  >
    +
  </button>
</div>
              </div>
              <div className="flex justify-end mr-3"> {/* Centralizar o botão de remover */}
  <button
    className="mt-2 px-1 py-1 border border-red-500 text-sm font-semibold text-red-500 rounded-full hover:bg-red-100 transition" // Borda vermelha e efeito hover sutil
    onClick={() => onRemoveItem(item.id)}
  >
    Remover
  </button>
</div>

            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
