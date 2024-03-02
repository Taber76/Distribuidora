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

        <div className="btn btn-primary py-2 mb-2 flex justify-between rounded bg-blue-500 text-white w-full text-left">
          <span className="ml-2">Productos</span>
          <div className="sm:hidden flex items-center justify-end w-[5%]">
            <FaPlus
              className="text-green-500 mr-2 cursor-pointer"
              title="Agregar producto"
              onClick={handleAddProductLine}
            />
          </div>
        </div>

        <div className="hidden sm:block  flex items-center gap-4 w-full">
          <div className="flex flex-col sm:flex-row bg-blue-500 rounded-md shadow-md p-4 w-full">

            <div className='mb-2 sm:mb-0 flex items-center w-[70%]' >
              <p className="text-sm text-white font-semibold">Descripcion</p>
            </div>
            <div className="mb-2 sm:mb-0 flex items-center justify-end w-[5%]" >
              <p className="text-sm text-white font-semibold">Cantidad</p>
            </div>
            <div className="mb-2 sm:mb-0 flex items-center justify-end w-[10%]">
              <p className="text-sm text-white font-semibold">Precio unidad</p>
            </div>
            <div className="mb-2 sm:mb-0 flex items-center justify-end w-[10%]">
              <p className="text-sm text-white font-semibold">Total</p>
            </div>
            <div className="flex items-center justify-end mb-2 sm:mb-0 w-[5%]">
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

              <div className="mb-2 sm:mb-0 flex items-center w-full sm:w-[69%] sm:block" >
                <input
                  className="text-sm font-semibold w-full bg-blue-100 "
                  type="text"
                  value={productLine.description}
                  onChange={(e) => handleProductLineChange(index, 'description', e.target.value)}
                  placeholder='Descripción del producto'
                />
              </div>

              <div className="mb-2 sm:mb-0 flex items-center  w-3/4 sm:w-[8%]">
                <input
                  className="text-sm w-full bg-blue-200 text-right sm:text-left"
                  type="number"
                  value={productLine.quantity}
                  onChange={(e) => handleProductLineChange(index, 'quantity', e.target.value)}
                />
                <span className="sm:hidden text-sm ml-1 font-semibold w-full text-left" >Cantidad</span>
              </div>

              <div className="mb-2 sm:mb-0 flex items-center w-3/4 sm:w-[9%]">
                <span className="text-sm  w-full pr-1 bg-blue-100 text-left text-right sm:text-left" >1000</span>
                <span className="sm:hidden text-sm ml-1 font-semibold w-full text-left" >Precio unidad</span>
              </div>

              <div className="mb-2 sm:mb-0 flex items-center justify-end w-3/4 sm:w-[9%]">
                <span className="text-sm font-semibold w-full bg-blue-200 pr-1 text-right" >150000</span>
                <span className="sm:hidden text-sm ml-1 font-semibold w-full text-left" >Total</span>
              </div>

              <div className="flex items-center justify-end w-full sm:w-[5%]">
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
      <div className="btn btn-primary flex justify-end rounded bg-blue-500 text-white w-full">
        <span className="mr-2">Totales</span>
      </div>

      <div className="flex w-full">
        <div className="w-1/3">
        </div>
        <div className="flex flex-col w-2/3">

          <div className='flex items-center w-full bg-blue-100 mb-1'>
            <div className="text-sm flex items-center w-1/2 justify-end">
              <p>Subtotal</p>
            </div>
            <div className="text-sm font-semibold ml-1 flex w-1/2 justify-end">
              <p>200000</p>
            </div>
          </div>

          <div className='flex items-center w-full bg-blue-200 mb-1'>
            <div className="text-sm flex items-center w-1/2 justify-end">
              <p>Descuentos</p>
            </div>
            <div className="text-sm font-semibold ml-1 flex w-1/2 justify-end">
              <p>3500</p>
            </div>
          </div>

          <div className='flex items-center w-full bg-blue-100 mb-2'>
            <div className="text-sm flex items-center w-1/2 justify-end">
              <p>IVA</p>
            </div>
            <div className="text-sm font-semibold ml-1 flex w-1/2 justify-end">
              <p>21540</p>
            </div>
          </div>

          <div className='flex items-center w-full bg-blue-300'>
            <div className="text-sm flex items-center w-1/2 justify-end">
              <p>TOTAL</p>
            </div>
            <div className="text-sm font-semibold ml-1 flex w-1/2 justify-end">
              <p>217894</p>
            </div>
          </div>

        </div>
      </div>


      {/* Buttons */}
      <div className="flex w-full">

        <div className="flex w-1/3 m-1 justify-center">
          <input
            type="submit"
            value={buttonText}
            className="btn btn-primary py-2 rounded bg-blue-500 text-white text-center w-full"
          />
        </div>

        <div className="flex w-1/3 m-1 justify-center">
          <input
            type="submit"
            value="Guardar"
            className="btn btn-primary py-2 rounded bg-blue-500 text-white text-center w-full"
          />
        </div>

        <div className="flex w-1/3 m-1 justify-center">
          <input
            type="submit"
            value="Facturar"
            className="btn btn-primary py-2 rounded bg-blue-500 text-white text-center w-full"
          />
        </div>



      </div>



    </form>
  );
};

export { FormOrder };
