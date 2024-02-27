import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { apiService } from '../../services/apiService';

const PasswordChange = () => {
  const [formData, setFormData] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (formData.password !== formData.repassword) {
        console.error('Las contraseñas no coinciden');
        return;
      }
      const response = await fetch('http://localhost:8080/api/v1/user/update', {
        method: 'PUT',
        headers: {
          'Bearer': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      if (response.ok) {
        // La solicitud fue exitosa, puedes manejar la respuesta aquí
        console.log('Datos enviados correctamente');
      } else {
        console.error('Error al enviar datos');
      }
      const resp = await response.json();
      console.log(resp);
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }

  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }


  return (
    <div className="py-4 md:py-6">
      <div className="flex flex-col text-center items-center">
        <h2>Cambio de contraseña</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4 w-2/3">
          <input
            className="bg-blue-100 text-xs rounded p-2"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Escriba su nueva contraseña."
          />

          <input
            className="bg-blue-100 text-xs rounded p-2"
            type="password"
            name="repassword"
            value={formData.repassword}
            onChange={handleChange}
            required
            placeholder="Repita su contraseña."
          />

          <input type="submit" value="Cambiar" className="btn btn-primary py-2 rounded bg-blue-500 text-white" />
        </form>
      </div>
    </div>
  )


}

export { PasswordChange }