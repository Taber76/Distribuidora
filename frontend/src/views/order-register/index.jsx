import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { apiService } from '../../services/apiService';
import { Modal, FormOrder } from '../../components';

const OrderRegister = () => {
	const [showModal, setShowModal] = useState(false);
	const [modalText, setModalText] = useState('');
	const [formData, setFormData] = useState({});
	const navigate = useNavigate()

	const activeModal = (text, time) => {
		setShowModal(true);
		setModalText(text);
		setTimeout(() => {
			setShowModal(false);
			navigate('/orders')
		}, time)
	}

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const res = await apiService.postPut('POST', 'order/register', formData)
			if (res.status === 201) {
				activeModal("Orden registrada correctamente.", 1500)
			} else {
				activeModal("Error al intentar registrar la orden.", 2500)
			}
		} catch (error) {
			activeModal("Error al intentar registrar la orden.", 2500)
		}
	};


	return (
		<div className="py-4 md:py-6">
			<div className="flex flex-col text-center items-center">
				<h2>Registro de orden de compra</h2>

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

				<FormOrder
					handleChange={handleChange}
					onSubmit={handleSubmit}
					buttonText="Registro"
				/>

			</div>
		</div>
	);
};


export { OrderRegister };
