import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { apiService } from '../../services/apiService';
import { Modal, FormOrder } from '../../components';

const OrderUpdate = () => {
	const [showModal, setShowModal] = useState(false);
	const [modalText, setModalText] = useState('');
	const [formData, setFormData] = useState({});
	const navigate = useNavigate()
	const location = useLocation();

	const activeModal = (text, time) => {
		setShowModal(true);
		setModalText(text);
		setTimeout(() => {
			setShowModal(false);
		}, time)
	}

	useEffect(() => {
		const getData = async () => {
			console.log(location.state.item_id, "order_id")
			const res = await apiService.get(`order/getbyfield/_id/${location.state.item_id}`)
			console.log(res)
			if (res.status === 202) {
				const data = await res.json();
				setFormData(data.item)
			} else {
				activeModal('Error al obtener los datos de la orden.', 2500)
			}
		}
		console.log("formData", formData)
		getData()
	}, [])


	const handleFillForm = (newForm) => {
		setFormData(newForm);
	};

	useEffect(() => {
		if (Object.keys(formData).length > 0) {
			handleSubmit();
		}
	}, [formData]);


	const handleSubmit = async () => {
		try {
			const res = await apiService.postPut('PUT', 'order/update', formData)
			if (res.status === 202) {
				activeModal("Orden actualizada correctamente.", 1500)
			} else {
				activeModal("Error al intentar actualizar la orden.", 2500)
			}
		} catch (error) {
			activeModal("Error al intentar actualizar la orden.", 2500)
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
					handleFillForm={handleFillForm}
					preloadedData={{ cient: "pepe", items: [], discount: 0 }}
				/>

			</div>
		</div>
	);
};


export { OrderUpdate };
