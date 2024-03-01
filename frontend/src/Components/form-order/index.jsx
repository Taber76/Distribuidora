import { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

import { apiService } from '../../services/apiService';

const FormOrder = ({ handleChange, onSubmit, buttonText }) => {
  const [clientList, setClientList] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [productLines, setProductLines] = useState([])

  const handleChangeClient = async (event) => {
    const { name, value } = event.target;
    if (value.length > 2 && clientList.length === 0) {
      const res = await apiService.get('contact/getbypartialmatch/' + value);
      if (res.status === 202) {
        const data = await res.json();
        setClientList(data.contacts);
      }
    } else if (value.length < 3) {
      setClientList([]);
    }
  }

  const handleSelectClient = async (event) => {
    const selectedName = event.target.value;
    const selectedClient = clientList.find(client => client.name === selectedName);
    if (selectedClient) {
      setSelectedClient(selectedClient);
    }
  }

  const handleAddProductLine = () => {
    setProductLines([...productLines, { description: '', quantity: 0 }]);
  };

  const handleProductLineChange = (index, field, value) => {
    const updatedProductLines = [...productLines];
    updatedProductLines[index][field] = value;
    setProductLines(updatedProductLines);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-4 w-4/5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between w-full">

        <div className="flex flex-col flex-1 sm:w-full border border-gray-300 rounded p-2 m-1" style={{ width: '100%' }}>
          <span className="text-xs text-gray-500" style={{ textAlign: 'left' }}>Nombre del cliente</span>
          <input
            className="bg-blue-100 text-xs rounded p-1 mt-1"
            type="text"
            name="client_name"
            list="clients"
            onChange={handleChangeClient}
            required={true}
            onSelect={handleSelectClient}
          />
          <datalist id="clients">
            {clientList.map((client) => (
              <option key={client._id} value={client.name} />
            ))}
          </datalist>
        </div>

        <div className="flex flex-col flex-1 sm:w-full border border-gray-300 rounded p-2 m-1" style={{ width: '100%' }}>
          <span className="text-xs text-gray-500" style={{ textAlign: 'left' }}>Dirección</span>
          <span className="bg-blue-100 text-xs rounded p-1 mt-1 block" style={{ minHeight: '1.5rem' }}>{selectedClient?.address || ' '}</span>
        </div>

        <div className="flex flex-col flex-1 sm:w-full border border-gray-300 rounded p-2 m-1" style={{ width: '100%' }}>
          <span className="text-xs text-gray-500" style={{ textAlign: 'left' }}>RUT</span>
          <span className="bg-blue-100 text-xs rounded p-1 mt-1 block" style={{ minHeight: '1.5rem' }}>{selectedClient?.rut || ' '}</span>
        </div>

      </div>

      {/* Items */}
      <div className="flex flex-col items-center justify-between w-full">

        <div className="btn btn-primary py-2 mb-2 rounded bg-blue-500 text-white w-full text-left">
          <span className="ml-2">Productos</span>
        </div>

        <div className="flex items-center gap-4 w-full">
          <div className="flex flex-col sm:flex-row bg-blue-500 rounded-md shadow-md p-4 w-full">

            <div className='mb-2 sm:mb-0 flex items-center' style={{ minWidth: `70%` }}>
              <p className="text-sm text-white font-semibold">Descripcion</p>
            </div>
            <div className="mb-2 sm:mb-0 flex items-center justify-end" style={{ minWidth: `5%` }}>
              <p className="text-sm text-white font-semibold">Cantidad</p>
            </div>
            <div className="mb-2 sm:mb-0 flex items-center justify-end" style={{ minWidth: `10%` }}>
              <p className="text-sm text-white font-semibold">Precio unidad</p>
            </div>
            <div className="mb-2 sm:mb-0 flex items-center justify-end" style={{ minWidth: `10%` }}>
              <p className="text-sm text-white font-semibold">Total</p>
            </div>
            <div className="flex items-center justify-end mb-2 sm:mb-0" style={{ minWidth: `5%` }}>
              <FaPlus
                className="text-green-500 mr-2 cursor-pointer"
                title="Agregar producto"
                onClick={handleAddProductLine}
              />
            </div>

          </div>
        </div>

        {productLines.map((productLine, index) => (
          <div key={index} className="flex items-center gap-4 w-full">
            <div className="flex flex-col sm:flex-row rounded-md shadow-md p-1 w-full">

              <div className="mb-2 sm:mb-0 flex items-center" style={{ width: '70%' }}>
                <input
                  className="text-sm font-semibold w-full bg-blue-100 mt-1"
                  type="text"
                  value={productLine.description}
                  onChange={(e) => handleProductLineChange(index, 'description', e.target.value)}
                />
              </div>

              <div className="mb-2 sm:mb-0 flex items-center" style={{ width: '5%' }}>
                <input
                  className="text-sm font-semibold w-full bg-blue-100  mt-1 text-right"
                  type="number"
                  value={productLine.quantity}
                  onChange={(e) => handleProductLineChange(index, 'quantity', e.target.value)}
                />
              </div>

              <div className="mb-2 sm:mb-0 flex items-center" style={{ width: '10%' }}>
                <span className="text-sm font-semibold w-full bg-blue-100 mt-1 text-right" >10</span>
              </div>

              <div className="mb-2 sm:mb-0 flex items-center" style={{ width: '10%' }}>
                <span className="text-sm font-semibold w-full bg-blue-100 pr-1 mt-1 text-right" >150</span>
              </div>

              <div className="flex items-center bg-blue-100 mt-1 justify-end" style={{ width: '5%' }}>
                <FaTrash
                  className="text-red-500 cursor-pointer"
                  title="Eliminar Linea"
                  onClick={() => handleDeleteProductLine(index)}
                />
              </div>

            </div>
          </div>
        ))}

      </div>

      {/* Total Price */}



      {/* Buttons */}
      < input type="submit" value={buttonText} className="btn btn-primary py-2 rounded bg-blue-500 text-white" />
    </form>
  );
};

export { FormOrder };
