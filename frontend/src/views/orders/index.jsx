import { FaPlus, FaSearch } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { apiService } from '../../services/apiService';
import { helpers } from '../../services/helpers';
import { Filter, Modal, List } from '../../components';

const Orders = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const [orderList, setOrderList] = useState([])
  const [deleteOrder, setDeleteOrder] = useState(false)

  // Filters
  const [client, setClient] = useState('')
  const [user, setUser] = useState('')
  const [status, setStatus] = useState('')
  const [date, setDate] = useState('')
  const [invoice, setInvoice] = useState('')

  const navigate = useNavigate()

  const activeModal = (text, time) => {
    setShowModal(true);
    setModalText(text);
    setTimeout(() => {
      setShowModal(false);
    }, time)
  }

  const columnWidths = {
    client_name: '40%',
    status: '15%',
    invoice_number: '15%',
    created_at: '20%',
  }

  useEffect(() => {
    const getOrders = async () => {
      const res = await apiService.get('order/getall')
      if (res.status === 202) {
        const data = await res.json()
        // const orders = data.orders.map(({ client_id, user_id, items, discount, observation, updated_at, finished_at, ...rest }) => rest)
        data.orders.forEach((order) => {
          order.created_at = helpers.formatDate(order.created_at)
        })
        setOrderList(data.orders)
      } else {
        activeModal('No se han podido cargr las ordenes de compra.')
      }
    }
    getOrders()
  }, [deleteOrder])


  const handleSearch = async () => {
    try {
      let filter = {}
      if (client) filter.client_name = client
      if (user) filter.user_id = user
      if (status) filter.status = status
      if (date) filter.created_at = date
      if (invoice) filter.invoice_number = invoice
      let res
      if (Object.keys(filter).length === 0) {
        res = await apiService.get('order/getall')
      } else {
        res = await apiService.postPut('POST', 'order/getFiltered', filter)
      }
      if (res.status === 202) {
        const data = await res.json()
        data.orders.forEach((order) => {
          order.created_at = helpers.formatDate(order.created_at)
        })
        setOrderList(data.orders)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="py-4 md:py-6">
      <div className="flex flex-col text-center items-center">
        <h2>Ventas</h2>

        {/* Filters */}
        <div className="w-full flex flex-col sm:flex-row gap-4 justify-center items-center">

          <div className="flex items-center">
            <p className="font-semibold">
              Filtrar por:
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">

            <Filter
              name="Clientes"
              getRoute="contact/getall"
              jsonData="contacts"
              searchField="name"
              liveFilter={true}
              setFilter={setClient}
            />

            <Filter
              name="Vendedores"
              getRoute="user/getall"
              searchField="name"
              jsonData="users"
              liveFilter={true}
              setFilter={setUser}
            />

            <Filter
              name="Estado"
              getRoute=""
              searchField="status"
              liveFilter={true}
              preLoadedOptions={[
                { status: 'Pendiente' },
                { status: 'En proceso' },
                { status: 'Finalizado' },
                { status: 'Cancelado' },
              ]}
              setFilter={setStatus}
            />

            <Filter
              name="Fecha"
              getRoute="order/getall"
              searchField="created_at"
              liveFilter={true}
              preLoadedOptions={[
                { created_at: 'Semana' },
                { created_at: 'Mes' },
                { created_at: 'Trimestre' },
                { created_at: 'Año' },
                { created_at: 'Todos' },
              ]}
              setFilter={setDate}
            />

            <Filter
              name="Factura"
              getRoute="order/getall"
              searchField="invoice_number"
              liveFilter={false}
              setFilter={setInvoice}
            />

          </div>

          <div className={`flex items-center justify-end mb-2 sm:mb-0`} >
            <FaSearch
              className="text-green-500 mr-2 cursor-pointer"
              title="Buscar"
              onClick={handleSearch}
            />
          </div>

        </div>

        {/* Orders list */}

        <div className="flex flex-col gap-4 mt-4 w-4/5">

          {showModal && (
            <Modal
              text={modalText}
              width="300px"
              height="150px"
              color="blue"
              textColor="white"
              margin="0"
            />
          )}

          <div className="flex orders-center gap-4 w-full">
            <div className="flex flex-col sm:flex-row bg-blue-500 rounded-md shadow-md p-4 w-full">

              <div className={`mb-2 sm:mb-0 orders-center justify-center flex`} style={{ minWidth: `${columnWidths.client_name}` }}>
                <h3 className="text-md text-white font-semibold">Cliente</h3>
              </div>
              <div className={`mb-2 sm:mb-0`} style={{ minWidth: `${columnWidths.status}` }}>
                <h3 className="text-md text-white font-semibold">Estado</h3>
              </div>
              <div className={`mb-2 sm:mb-0`} style={{ minWidth: `${columnWidths.invoice_number}` }}>
                <h3 className="text-md text-white font-semibold">Factura</h3>
              </div>
              <div className={`mb-2 sm:mb-0 orders-center justify-center flex`} style={{ minWidth: `${columnWidths.created_at}` }}>
                <h3 className="text-md text-white font-semibold">Fecha</h3>
              </div>

              <div className={`flex orders-center justify-end items-center mb-2 sm:mb-0`} style={{ minWidth: `10%` }}>
                <FaPlus
                  className="text-green-500 mr-2 cursor-pointer"
                  title="Nuevo"
                  onClick={() => navigate('/orders/register')}
                />
              </div>

            </div>
          </div>

          {orderList && (
            <List
              items={orderList}
              columnWidths={columnWidths}
              handleDelete={() => setDeleteOrder(prevDeleteOrder => !prevDeleteOrder)}
              type="order"
            />)}

        </div>
      </div>
    </div>
  )

}

export { Orders }