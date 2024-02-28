import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { apiService } from '../../services/apiService';
import { setUser } from '../../store/userSlice';
import { Modal } from '../../components';

const UserRegister = () => {
	const [showModal, setShowModal] = useState(false);
	const [modalText, setModalText] = useState('');
	const [formData, setFormData] = useState({});
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate()

	const activeModal = (text, time) => {
		setShowModal(true);
		setModalText(text);
		setTimeout(() => {
			setShowModal(false);
			navigate('/users')
		}, time)
	}

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const res = await apiService.postPut('POST', 'user/register', formData)
			if (res.status === 201) {
				activeModal("Usuario registrado correctamente.", 1500)
				const data = await res.json()
				if (!user.user) {
					localStorage.setItem('token', data.token);
					dispatch(setUser(data.user));
				}
			} else {
				activeModal("Error al intentar registrar al usuario.", 2500)
			}
		} catch (error) {
			activeModal("Error al intentar registrar al usuario.", 2500)
		}
	};

	return (
		<div className="py-4 md:py-6">
			<div className="flex flex-col text-center items-center">
				<h2>Registro de usuario</h2>
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

					<input type="submit" value="Registro" className="btn btn-primary py-2 rounded bg-blue-500 text-white" />
				</form>
			</div>
		</div>
	);
};


export { UserRegister };
