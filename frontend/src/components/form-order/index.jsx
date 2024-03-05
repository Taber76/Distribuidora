import { useEffect, useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

import { InputDropdown } from '../input-dropdown';

const FormOrder = ({ handleFillForm }) => {
  const [selectedClient, setSelectedClient] = useState({});
  const [selectedProduct, setSelectedProduct] = useState({});
  const [productList, setProductList] = useState([])
  const [total, setTotal] = useState(0);
  const [iva, setIva] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    if (selectedProduct.selectedElementOfList) {
      const updatedProductList = [...productList];
      updatedProductList[selectedProduct.index].description = selectedProduct.selectedElementOfList.description;
      selectedProduct.selectedElementOfList.sale_price ? updatedProductList[selectedProduct.index].sale_price = selectedProduct.selectedElementOfList.sale_price : 0;
      selectedProduct.selectedElementOfList._id ? updatedProductList[selectedProduct.index].item_id = selectedProduct.selectedElementOfList._id : 0;
      setProductList(updatedProductList);
    }
  }, [selectedProduct])

  useEffect(() => {
    if (productList.length > 0) {
      let sum = 0;
      productList.forEach((product) => {
        if (isNaN(product.quantity)) product.quantity = 0
        if (isNaN(product.sale_price)) product.sale_price = 0
        sum += product.quantity * product.sale_price;
      })
      setSubtotal(parseFloat(sum).toFixed(2))
      setDiscount(parseFloat(sum * (discountPercentage / 100)).toFixed(2))
      setIva(parseFloat(sum * (1 - (discountPercentage / 100)) * (22 / 100)).toFixed(2))
      setTotal(parseFloat(sum * (1 - (discountPercentage / 100)) * (122 / 100)).toFixed(2))
    }
  }, [productList, discountPercentage])

  const handleAddProductLine = () => {
    setProductList([...productList, { description: '', quantity: 0 }]);
  };

  const handleRemoveProductLine = (index) => {
    const updatedProductList = productList.filter((_, i) => i !== index);
    setProductList(updatedProductList);
  }

  const handleProductListChange = (index, field, value) => {
    const updatedProductList = [...productList];
    updatedProductList[index][field] = value;
    setProductList(updatedProductList);
  };

  const fillForm = (status) => {
    const client = selectedClient.selectedElementOfList
    const newForm = {
      client_id: client._id,
      client_name: client.name,
      user_id: '5452435425254324',
      discount: discountPercentage,
      observation: '',
      status: status,
      items: productList.map((item) => ({
        item_id: item.item_id, quantity: item.quantity, price: item.sale_price
      }))
    }
    handleFillForm(newForm)
  }

  const handleSendOrder = () => {
    fillForm('IN_PROGRESS')
  }

  const handleSaveOrder = () => {
    fillForm()
    console.log('saving order')
  }

  const handleBillOrder = () => {
    fillForm()
    console.log('bill order')
  }

  return (
    <form className="flex flex-col gap-4 mt-4 w-4/5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between w-full">

        <div className="flex flex-col flex-1 sm:w-full border border-gray-300 rounded p-2 m-1" style={{ width: '100%' }}>
          <span className="text-xs text-gray-500" style={{ textAlign: 'left' }}>Nombre del cliente</span>
          <InputDropdown
            className="bg-blue-100 text-xs rounded p-1 mt-1 w-full"
            type="text"
            required={true}
            setValue={setSelectedClient}
            apiUrl='contact/getbypartialmatch/'
            jsonResponse={'contacts'}
            fieldName={'name'}
            index={0}
            listName={'contactList'}
          />
        </div>

        <div className="flex flex-col flex-1 sm:w-full border border-gray-300 rounded p-2 m-1" style={{ width: '100%' }}>
          <span className="text-xs text-gray-500" style={{ textAlign: 'left' }}>Dirección</span>
          <span className="bg-blue-100 text-xs rounded p-1 mt-1 block" style={{ minHeight: '1.5rem' }}>{selectedClient && selectedClient.selectedElementOfList && selectedClient.selectedElementOfList.address || ' '}</span>

        </div>

        <div className="flex flex-col flex-1 sm:w-full border border-gray-300 rounded p-2 m-1" style={{ width: '100%' }}>
          <span className="text-xs text-gray-500" style={{ textAlign: 'left' }}>RUT</span>
          <span className="bg-blue-100 text-xs rounded p-1 mt-1 block" style={{ minHeight: '1.5rem' }}>{selectedClient && selectedClient.selectedElementOfList && selectedClient.selectedElementOfList.rut || ' '}</span>
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

        {productList.map((product, index) => (
          <div key={index} className="flex items-center gap-4 w-full">
            <div className="flex flex-col sm:flex-row rounded-md shadow-md p-1 w-full">

              <div className="mb-2 sm:mb-0 flex items-center w-full sm:w-[69%] sm:block" >
                <InputDropdown
                  className={"text-sm font-semibold w-full bg-blue-100"}
                  type={"text"}
                  placeholder={"Descripción del producto"}
                  required={true}
                  inputValue={product.description}
                  setValue={setSelectedProduct}
                  apiUrl={"item/getbypartialmatch/"}
                  jsonResponse={"items"}
                  fieldName={"description"}
                  index={index}
                  listName={"itemList" + index}
                />
              </div>

              <div className="mb-2 sm:mb-0 flex items-center  w-3/4 sm:w-[8%]">
                <input
                  className="text-sm w-full bg-blue-200 text-right sm:text-left"
                  type="number"
                  inputMode="numeric"
                  onWheel={(e) => e.preventDefault()}
                  value={product.quantity}
                  onChange={(e) => handleProductListChange(index, 'quantity', e.target.value)}
                />
                <span className="sm:hidden text-sm ml-1 font-semibold w-full text-left" >Cantidad</span>
              </div>

              <div className="mb-2 sm:mb-0 flex items-center w-3/4 sm:w-[9%]">
                <input
                  className="text-sm  w-full pr-1 bg-blue-100 text-left text-right sm:text-left"
                  type="number"
                  inputMode="numeric"
                  onWheel={(e) => e.preventDefault()}
                  value={product.sale_price}
                  onChange={(e) => handleProductListChange(index, 'sale_price', e.target.value)}
                />
                <span className="sm:hidden text-sm ml-1 font-semibold w-full text-left" >Precio unidad</span>
              </div>

              <div className="mb-2 sm:mb-0 flex items-center justify-end w-3/4 sm:w-[9%]">
                <span className="text-sm font-semibold w-full bg-blue-200 pr-1 text-right" >{isNaN(product.quantity * product.sale_price) ? 0 : product.quantity * product.sale_price}</span>
                <span className="sm:hidden text-sm ml-1 font-semibold w-full text-left" >Total</span>
              </div>

              <div className="flex items-center justify-end w-full sm:w-[5%]">
                <FaTrash
                  className="text-red-500 cursor-pointer"
                  title="Eliminar Linea "
                  onClick={() => handleRemoveProductLine(index)}
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
              <p>{subtotal}</p>
            </div>
          </div>

          <div className='flex items-center w-full bg-blue-200 mb-1'>
            <div className="text-sm flex items-center w-1/2 justify-end">
              <p>Descuento (%)</p>
            </div>
            <div className="text-sm font-semibold ml-1 flex w-1/2 justify-end">
              <input
                className="text-sm w-1/5 bg-blue-200 text-right"
                type="number"
                inputMode="numeric"
                onWheel={(e) => e.preventDefault()}
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(e.target.value)}
              />
              <p className="text-sm w-4/5 bg-blue-200 text-right">{discount}</p>
            </div>
          </div>

          <div className='flex items-center w-full bg-blue-100 mb-2'>
            <div className="text-sm flex items-center w-1/2 justify-end">
              <p>IVA</p>
            </div>
            <div className="text-sm font-semibold ml-1 flex w-1/2 justify-end">
              <p>{iva}</p>
            </div>
          </div>

          <div className='flex items-center w-full bg-blue-300'>
            <div className="text-sm flex items-center w-1/2 justify-end">
              <p>TOTAL</p>
            </div>
            <div className="text-sm font-semibold ml-1 flex w-1/2 justify-end">
              <p>{total}</p>
            </div>
          </div>

        </div>
      </div>


      {/* Buttons */}
      <div className="flex w-full">

        <div className="flex w-1/3 m-1 justify-center">
          <input
            className="btn btn-primary py-2 rounded bg-blue-500 text-white text-center w-full"
            type='button'
            onClick={handleSendOrder}
            value={"Enviar"}
          />
        </div>

        <div className="flex w-1/3 m-1 justify-center">
          <input
            className="btn btn-primary py-2 rounded bg-blue-500 text-white text-center w-full"
            type="button"
            onClick={handleSaveOrder}
            value="Guardar"
          />
        </div>

        <div className="flex w-1/3 m-1 justify-center">
          <input
            className="btn btn-primary py-2 rounded bg-blue-500 text-white text-center w-full"
            type="submit"
            onClick={handleBillOrder}
            value="Facturar"
          />
        </div>


      </div>
    </form>
  );
};

export { FormOrder };
