import { Home, Contacts, ContactRegister, ContactUpdate, Login, Orders, OrderRegister, Users, UserRegister, UserUpdate, PasswordChange, ItemRegister, Items } from './views';
import { NavBar, Footer } from './components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
	return (
		<div className="App">
			<Router>
				<NavBar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/contacts" element={<Contacts />} />
					<Route path="/contacts/register" element={<ContactRegister />} />
					<Route path="/contacts/update" element={<ContactUpdate />} />
					<Route path="/items" element={<Items />} />
					<Route path="/items/register" element={<ItemRegister />} />
					<Route path="/login" element={<Login />} />
					<Route path="/orders" element={<Orders />} />
					<Route path="/orders/register" element={<OrderRegister />} />
					<Route path="/users" element={<Users />} />
					<Route path="/users/register" element={<UserRegister />} />
					<Route path="/users/update" element={<UserUpdate />} />
					<Route path="/users/password-change" element={<PasswordChange />} />
				</Routes>
				<Footer />
			</Router>
		</div>
	);
}

export default App;
