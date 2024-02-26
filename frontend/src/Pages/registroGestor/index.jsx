import { Link } from 'react-router-dom';

const RegistroGes = () => {
	return (
		<div className="ContLog">
			<div className="log ">
				<Link to="/Registro" className="titRegis">
					{`<--`}Registrarse como Usuario
				</Link>
				<h2>Registrarse como Gestor</h2>
				<form action="" method="get" className="cajaLog">
					<input
						className="inp"
						type="text"
						name="nombre"
						required
						placeholder="Crear tu Usuario..."
					></input>

					<input
						className="inp"
						type="password"
						name="password"
						required
						placeholder="Escribe Tu Contraseña..."
					></input>

					<input
						className="inp"
						type="password"
						name="password"
						required
						placeholder="Repite Tu Contraseña..."
					></input>

					<input
						className="inp"
						type="text"
						name="dni"
						required
						placeholder="Coloca tu dni..."
					></input>

					<input
						className="inp"
						type="number"
						name="telefono"
						required
						placeholder="Coloca tu numero de telefono"
					></input>

					<label className="lbl ">
						{' '}
						Acepto Los terminos y condiciones
						<input type="checkbox" name="acepto" required className="checbox"></input>
					</label>

					<input type="submit" value="Registrarse Como Gestor" className="btnCont"></input>
				</form>
			</div>
		</div>
	);
};

export { RegistroGes };
