
import { useState, useEffect } from 'react';

const Inicio = () => {
	const [APIres, setAPIres] = useState(null);

	useEffect(() => {
		fetch('https://backend-bzl2.onrender.com/')
			.then(res => {
				return res.json();
			})
			.then(data => {
				data = JSON.stringify(data);
				setAPIres(data);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	return (
		<div>
			<div className="ContInp">
				<input type="search" name="" id="" placeholder="Buscar gestor..." className="Inpt" />
			</div>

			<div>{APIres}</div>
		</div>
	);
};

export { Inicio };
