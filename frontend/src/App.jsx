import { Inicio, Login, Registro, RegistroGes } from './Pages';
import { NavBar, Footer } from './Components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
	return (
		<div className="App">
			<Router>
				<NavBar />
				<Routes>
					<Route path="/" element={<Inicio />} />
					<Route path="/Login" element={<Login />} />
					<Route path="/Registro" element={<Registro />} />
					<Route path="/RegistroGes" element={<RegistroGes />} />
				</Routes>
				<Footer />
			</Router>
		</div>
	);
}

export default App;
