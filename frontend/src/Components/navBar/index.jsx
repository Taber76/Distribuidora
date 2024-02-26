import { Link } from 'react-router-dom';

const NavBar = () => (
	<nav className="NvBar">
		<Link className="link" to="/">
			Inicio
		</Link>
		<Link className="link" to="/login">
			Login
		</Link>
		<Link className="link" to="/registro">
			Registro
		</Link>
		<Link className="link" to="/registroGes">
			RegistroGes
		</Link>
	</nav>
);

export { NavBar };