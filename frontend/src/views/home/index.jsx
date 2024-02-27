import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { apiService } from '../../services/apiService';
import { setUser } from '../../store/userSlice';

const Home = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);

	useEffect(() => {
		const fetchData = async () => {
			if (localStorage.getItem('token') && !user.user) {
				const res = await apiService.users.getByToken();
				const data = await res.json();
				dispatch(setUser(data.user));
				console.log(17, "HOME llamada a la api")
			}
		};
		fetchData();
	}, []);

	return (
		<div className="py-4 md:py-6">
			<div className="flex flex-col text-center items-center">
				<h2>Home</h2>
			</div>
		</div>
	);
};

export { Home };
