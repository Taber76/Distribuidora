const Login = () => {
	return (
		<div className="ContLog">
			<div className="log">
				<h2>Login</h2>
				<form method="get" className="cajaLog">
					<input
						className="inp"
						type="text"
						name="nombre"
						required
						placeholder="Escribe tu Nombre..."
					></input>

					<input
						className="inp"
						type="password"
						name="contraseña"
						required
						placeholder="Escribe Tu Contrseña..."
					></input>

					<input type="submit" value="Ingresar" className="btnCont"></input>
				</form>
			</div>
		</div>
	);
};

export { Login };
