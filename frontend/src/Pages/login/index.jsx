import React, { useState } from 'react';

const Login = () => {
	const [formData, setFormData] = useState({
		nombre: '',
		contraseña: ''
	});

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const response = await fetch('http://localhost:8080/api/v1/user/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});

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
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	return (
		<div className="ContLog">
			<div className="log">
				<h2>Login</h2>
				<form onSubmit={handleSubmit} className="cajaLog">
					<input
						className="inp"
						type="text"
						name="nombre"
						value={formData.nombre}
						onChange={handleChange}
						required
						placeholder="Escribe tu Nombre..."
					/>

					<input
						className="inp"
						type="password"
						name="contraseña"
						value={formData.contraseña}
						onChange={handleChange}
						required
						placeholder="Escribe Tu Contraseña..."
					/>

					<input type="submit" value="Ingresar" className="btnCont" />
				</form>
			</div>
		</div>
	);
};

export { Login };

