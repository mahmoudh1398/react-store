import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {PATHS} from 'config/routes.config';
import * as Page from 'page';
import {ProtectedRoute, PublicRoute, PrivateRoute} from './components';
// import history from 'services/history.service';

function AppRoute() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={PATHS.BASKET} element={<PublicRoute component={(props) => <Page.Basket {...props} />} />} />
				<Route path={PATHS.CHECKOUT} element={<PublicRoute component={(props) => <Page.Checkout {...props} />} />} />
				<Route path={PATHS.HOME} element={<PublicRoute component={(props) => <Page.Home {...props} />} />} />
				<Route path={PATHS.NOT_FOUND} element={<PublicRoute component={(props) =><Page.NotFound {...props} />} />}/>
				<Route path={PATHS.PANEL_LOGIN} element={<ProtectedRoute component={(props) => <Page.PanelLogin {...props} />} />} />
				<Route path={PATHS.PANEL_ORDERS} element={<PrivateRoute component={(props) => <Page.PanelOrders {...props} />} />} />
				<Route path={PATHS.PANEL_PRODUCTS} element={<PrivateRoute component={(props) => <Page.PanelProducts {...props} />} />} />
				<Route path={PATHS.PANEL_QUANTITIES} element={<PrivateRoute component={(props) => <Page.PanelQuantities {...props} />} />} />
				<Route path={PATHS.PRODUCTS} element={<PublicRoute component={(props) => <Page.Products {...props} />} />} />
				<Route path={`${PATHS.PRODUCT}/:id`} element={<PublicRoute component={(props) => <Page.Product {...props} />} />} />
				<Route path={PATHS.PAYMENT_RESULT} element={<PublicRoute component={(props) => <Page.PaymentResult {...props} />} />} />
			</Routes>
		</BrowserRouter>
	);
}

export {AppRoute};
