import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import NavBar from './components/NavBar'
import Cart from './components/Cart'
import ProductPage from "./pages/ProductPage";
import NavMenu from "./components/NavMenu";
import Footer from './components/Footer'

function App() {
	return (
		<div className="App">
			<Router>
				<NavBar />
				<Cart />
				<NavMenu />
				<Switch>
					<Route path="/products/:handle">
						<ProductPage />
					</Route>
					<Route path="/">
						<Home />
					</Route>
				</Switch>
				<Footer />
			</Router>
		</div>
	);
}

export default App;
