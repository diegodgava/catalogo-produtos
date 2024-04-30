import { FC, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { MdOutlineArrowDropDown } from 'react-icons/md';

interface EstimateProps {
  cartItems: any[];
}

const BASE_SERVICE_FEE = 79;

const Estimate: FC<EstimateProps> = ({ cartItems }) => {
  const [customDiscount, setCustomDiscount] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDiscountBarVisible, setIsDiscountBarVisible] = useState(false); // Controle de visibilidade da barra de desconto


  const handleToggleDiscountBar = () => {
    setIsDiscountBarVisible((prev) => !prev); // Alternar a visibilidade da barra de desconto
  };

  const calculateTotalPrice = () => {
    if (cartItems.length === 0) {
      return null;
    }

    let totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    totalPrice += BASE_SERVICE_FEE;

    if (customDiscount === null) {
      const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
      if (itemCount >= 4 && itemCount <= 7) {
        totalPrice *= 0.945;
      } else if (itemCount > 7) {
        totalPrice *= 0.89;
      }
    } else {
      totalPrice *= 1 - customDiscount / 100;
    }

    return totalPrice.toFixed(2);
  };

  const handleApplyCustomDiscount = () => {
    const inputElement = document.getElementById('customDiscountInput') as HTMLInputElement;
    const discountValue = parseFloat(inputElement.value);

    if (!isNaN(discountValue)) {
      setCustomDiscount(discountValue);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const calculateCurrentDiscount = () => {
    const totalWithoutDiscount = BASE_SERVICE_FEE + cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    if (customDiscount !== null) {
      const totalWithDiscount = totalWithoutDiscount * (1 - (customDiscount / 100));
      const discountAmount = (totalWithoutDiscount - totalWithDiscount).toFixed(2);
      return discountAmount;
    } else {
      const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
      let discountAmount = 0;

      if (itemCount >= 4 && itemCount <= 7) {
        discountAmount = totalWithoutDiscount * 0.055;
      } else if (itemCount > 7) {
        discountAmount = totalWithoutDiscount * 0.11;
      }

      return discountAmount.toFixed(2);
    }
  };

  const totalPrice = calculateTotalPrice();

  return (
    <div className="bg-[#4DE372] text-black p-6 mt-4 font-semibold rounded-lg shadow-lg">
      {/* Alinhar o texto "Price" e o botão na mesma linha */}
      <div className="flex justify-between font-bold items-center">
        <p className='font-bold '>Price: {totalPrice !== null ? `$ ${totalPrice}` : '--'}</p>
        <button
          className="bg-white text-black px-3 py-1 rounded-lg hover:bg-gray-200 transition-shadow shadow-sm text-xs font-normal text" // Botão menor, mais suave
          onClick={openModal}
        >
          Ver detalhes
        </button>
      </div>

      {cartItems.length > 0 && (
        <div>
          {/* Inserir desconto com ícone de seta para baixo */}
          <div className="flex items-center mt-4 text-sm font-normal">
            <span onClick={handleToggleDiscountBar}>Inserir desconto</span>
            <MdOutlineArrowDropDown
              className="w-6 h-6 cursor-pointer ml-2"
              onClick={handleToggleDiscountBar} // Alternar visibilidade da barra de entrada
            />
          </div>

          {/* Barra de entrada para desconto e botão de aplicar */}
          {isDiscountBarVisible && (
            <div className="flex items-center mt-4">
              <input
                type="number"
                id="customDiscountInput"
                placeholder="Ex: 10"
                min="0"
                max="100"
                className="p-2 border rounded w-1/2" // Barra para inserir desconto
              />
              <button
                className="bg-white text-black px-3 py-2 rounded ml-2 hover:bg-gray-200 transition" // Botão de aplicar
                onClick={handleApplyCustomDiscount}
              >
                Aplicar
              </button>
            </div>
          )}
        </div>
      )}

      {isModalOpen && (
        <>
          {/* Modal para detalhes da estimativa */}
          <div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-4/5 max-w-4xl z-50" // Tamanho maior
          >
            <div className="flex justify-end items-center mb-4">
              <IoMdClose className="w-6 h-6 cursor-pointer text-gray-700" onClick={closeModal} /> {/* Ícone de fechamento */}
            </div>

            <p className="text-sm">Taxa de serviço base: ${BASE_SERVICE_FEE}</p>
            <hr className="my-2" />

            {cartItems.map((item) => (
              <p key={item.id} className="text-sm"> {/* Fonte menor */}
                {item.name}: {item.quantity} x ${item.price} = ${item.price * item.quantity}
              </p>
            ))}

            <hr className="my-2" />
            <p>Desconto aplicado: ${calculateCurrentDiscount()}</p>

            <hr className="my-2" />
            <p>Total: ${totalPrice}</p>
          </div>

          {/* Fundo escurecido para fechar o modal ao clicar fora */}
          <div
            className="fixed inset-0 bg-black opacity-50 z-40" // Z-index menor para o fundo escurecido
            onClick={closeModal}
          />
        </>
      )}
    </div>
  );
};


export default Estimate;