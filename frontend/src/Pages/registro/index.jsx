import { Link } from 'react-router-dom';

const Registro = () => {
	return (
		<div className="ContLog">
			<div className="log ">
				<Link to="/RegistroGes" className="titRegis">
					Registrarse como Gestor {`-->`}{' '}
				</Link>
				<h2>Registrarse como usuario</h2>
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

					<label className="lbl ">
						{' '}
						Acepto Los terminos y condiciones
						<input type="checkbox" name="acepto" required className="checbox"></input>
					</label>

					<input type="submit" value="Registrarse Como Usuario" className="btnCont"></input>
				</form>
			</div>
		</div>
	);
};

export { Registro };
