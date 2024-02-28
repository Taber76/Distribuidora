import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { apiService } from '../../services/apiService';
import { Modal } from '../../components';

const UserUpdate = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const [formData, setFormData] = useState({});
  const location = useLocation();

  const activeModal = (text, time) => {
    setShowModal(true);
    setModalText(text);
    setTimeout(() => {
      setShowModal(false);
    }, time)
  }

  useEffect(() => {
    const getUser = async () => {
      const user_id = location.state.user_id
      const res = await apiService.get(`user/getbyid/${user_id}`)
      if (res.status === 202) {
        const data = await res.json();
        setFormData(data.user)
      } else {
        activeModal('Error al obtener los datos del usuario.', 2500)
      }
    }
    getUser()
  }, [])


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await apiService.postPut('PUT', 'user/update', formData)
      if (res.status === 202) {
        activeModal("Usuario actualizado correctamente.", 1500)
      } else {
        activeModal("Error al intentar actualizar al usuario.", 2500)
      }
    } catch (error) {
      activeModal("Error al intentar actualizar al usuario.", 2500)
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }


  return (
    <div className="py-4 md:py-6">
      <div className="flex flex-col text-center items-center">
        <h2>Actualiza los datos</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4 w-2/3">

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

          <input
            className="bg-blue-100 text-xs rounded p-2"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required={true}
            placeholder="Nombre de usuario (requerido)"
          />

          <input
            className="bg-blue-100 text-xs rounded p-2"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required={false}
            placeholder="Nombre completo"
          />

          <input
            className="bg-blue-100 text-xs rounded p-2"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required={false}
            placeholder="Correo electrónico"
          />

          <input
            className="bg-blue-100 text-xs rounded p-2"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required={true}
            placeholder="Teléfono (requerido)"
          />

          <input
            className="bg-blue-100 text-xs rounded p-2"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required={false}
            placeholder="Dirección"
          />

          <input type="submit" value="Actualizar" className="btn btn-primary py-2 rounded bg-blue-500 text-white" />
        </form>
      </div>
    </div>
  )
}

export { UserUpdate }