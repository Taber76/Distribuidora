import { Home, Login, Register, PasswordChange } from './views';
import { NavBar, Footer } from './components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
	return (
		<div className="App">
			<Router>
				<NavBar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/password-change" element={<PasswordChange />} />
				</Routes>
				<Footer />
			</Router>
		</div>
	);
}

export default App;
