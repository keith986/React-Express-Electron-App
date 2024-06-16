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
import Report from "./pages/Report";
import Creditors from "./pages/Creditors";
import Expiry from "./pages/Expiry"
import Settings from "./pages/Settings";
import RedirectNavbar from "./components/redirectNavbars/RedirectNavbar";
import Usersbars from './components/Usersbar';
import UserNavbar from './components/userNavbar/UserNavbar';
import Userpage from './pages/Userpage';
import Usercategories from './pages/Usercategories';
import Userproducts from './pages/Userproducts';
import Userorders from './pages/Userorders';
import Userreports from './pages/Userreports';
import Usercreditor from './pages/Usercreditor';
import Usersettings from './pages/Usersettings'
import POS from "./pages/POS";
import Login from "./pages/Login/Login";
import LoginPage from "./components/LoginPage/LoginPage";
import SignUpPage from "./components/signupPage/SignUpPage";
import Signup from './pages/Signup/Signup'
import NewActivation from "./components/NewActivation/NewActivation";
import Activation from "./pages/Activation/Activation";

function App() {
	return (

		<BrowserRouter>
		<RedirectNavbar>
		<Sidebar/>
		</RedirectNavbar>

		<UserNavbar>
			<Usersbars/>
		</UserNavbar>

		<LoginPage>
			<Login />
		</LoginPage>

		<SignUpPage>
			<Signup />
		</SignUpPage>

		<NewActivation>
			<Activation />
		</NewActivation>

			<Routes>
				<Route path='/adminpage' element={<Dashboard />}/>
				<Route path='/userpage' element={<Userpage />}/>
				<Route path='/stores' element={<Stores />}/>
				<Route path='/users' element={<Users />}/>
				<Route path='/suppliers' element={<Suppliers />}/>
				<Route path='/POS' element={<POS />}/>
				<Route path='/categories' element={<Categories />}/>
				<Route path='/usercategories' element={<Usercategories />}/>
				<Route path='/products' element={<Products />}/>
				<Route path='/userproducts' element={<Userproducts />}/>
				<Route path='/orders' element={<Orders />}/>
				<Route path='/userorders' element={<Userorders />}/>
				<Route path='/reports' element={<Report />}/>
				<Route path='/userreports' element={<Userreports />}/>
				<Route path='/creditors' element={<Creditors />}/>
				<Route path='/usercreditors' element={<Usercreditor />}/>
				<Route path='/expires' element={<Expiry />}/>
				<Route path='/settings' element={<Settings />}/>
				<Route path='/usersettings' element={<Usersettings />}/>
			</Routes>
		</BrowserRouter>

	);
}

export default App;
