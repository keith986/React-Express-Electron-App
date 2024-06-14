import "./App.css";
import Sidebar from "./components/Sidebar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Stores from "./pages/Stores";
import Users from "./pages/Users";
import Suppliers from "./pages/Suppliers";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import Orders from './pages/Orders';

function App() {
	return (
		<BrowserRouter>
			<Sidebar />
			<Routes>
				<Route path='/' element={<Dashboard />}/>
				<Route path='/stores' element={<Stores />}/>
				<Route path='/users' element={<Users />}/>
				<Route path='/suplliers' element={<Suppliers />}/>
				<Route path='/categories' element={<Categories />}/>
				<Route path='/products' element={<Products />}/>
				<Route path='/orders' element={<Orders />}/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
