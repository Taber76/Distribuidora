import { Home, Login, Users, UserRegister, UserUpdate, PasswordChange, ItemRegister } from './views';
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
					<Route path="/users" element={<Users />} />
					<Route path="/user/register" element={<UserRegister />} />
					<Route path="/user/update" element={<UserUpdate />} />
					<Route path="/user/password-change" element={<PasswordChange />} />
					<Route path="/item/register-" element={<ItemRegister />} />
				</Routes>
				<Footer />
			</Router>
		</div>
	);
}

export default App;
