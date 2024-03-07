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
			}
		};
		fetchData();
	}, []);

	return (
		<div className="relative overflow-hidden">
			<img src="/warehouse.jpg" alt="" className="w-full md:h-auto md:w-full lg:w-full xl:w-full object-top" />
			<div class="absolute inset-0 bg-black opacity-25"></div>
		</div>
	);
};

export { Home };
