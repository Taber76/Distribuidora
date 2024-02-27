import React, { useState } from 'react';

const Register = () => {
	const [formData, setFormData] = useState({});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {

			const response = await fetch('http://localhost:8080/api/v1/user/register', {
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

	return (
		<div className="py-4 md:py-6">
			<div className="flex flex-col text-center items-center">
				<h2>Registro de usuario</h2>
				<form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4 w-2/3">

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

					<input type="submit" value="Registro" className="btn btn-primary py-2 rounded bg-blue-500 text-white" />
				</form>
			</div>
		</div>
	);
};


export { Register };
