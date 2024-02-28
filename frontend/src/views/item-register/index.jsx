import React, { useState } from 'react';

import { apiService } from '../../services/apiService';
import { Modal } from '../../components';


const ItemRegister = () => {
	const [showModal, setShowModal] = useState(false);
	const [modalText, setModalText] = useState('');
	const [formData, setFormData] = useState({});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};



	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const res = await apiService.items.register(formData);
			if (res.status === 201) {
				setShowModal(true);
				setModalText("Item registrado correctamente.");
				setTimeout(() => {
					setShowModal(false);
				}, 1500)
			} else {
				setShowModal(true);
				setModalText("Error al registrar el item.");
				setTimeout(() => {
					setShowModal(false);
				}, 2000)
			}
		} catch (error) {
			console.error('Error en la solicitud:', error);
		}
	};

	return (
		<div className="py-4 md:py-6">
			<div className="flex flex-col text-center items-center">
				<h2>Registro de producto</h2>
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
						name="description"
						value={formData.description}
						onChange={handleChange}
						required={true}
						placeholder="Descripción del producto (requerido)"
					/>

					<input
						className="bg-blue-100 text-xs rounded p-2"
						type="number"
						name="purchase_price"
						value={formData.purchase_price || ''}
						onChange={handleChange}
						required={false}
						placeholder="Precio de compra."
					/>

					<input
						className="bg-blue-100 text-xs rounded p-2"
						type="number"
						name="sale_price"
						value={formData.sale_price || ''}
						onChange={handleChange}
						required={false}
						placeholder="Precio de venta."
					/>

					<input
						className="bg-blue-100 text-xs rounded p-2"
						type="number"
						name="profit_margin"
						value={formData.profit_margin || ''}
						onChange={handleChange}
						required={false}
						placeholder="Margen de ganancia (%)."
					/>

					<input
						className="bg-blue-100 text-xs rounded p-2"
						type="number"
						name="stock"
						value={formData.stock}
						onChange={handleChange}
						required={false}
						placeholder="Stock."
					/>

					<input type="submit" value="Registro" className="btn btn-primary py-2 rounded bg-blue-500 text-white" />
				</form>
			</div>
		</div>
	);
};


export { ItemRegister };