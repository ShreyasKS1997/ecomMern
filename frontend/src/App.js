import { useLayoutEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import webfont from 'webfontloader';
import Home from './component/Home/Home';
import Layout from './component/layout/Layout';
import ProductDetails from './component/Product/ProductDetails';
import Products from './component/Product/Products';
import Search from './component/Product/Search';
import LoginSignUp from './component/User/LoginSignUp';
import UpdateProfile from './component/User/UpdateProfile.js';

import Profile from './component/User/Profile';
import { loadUser } from './actions/userAction';
import ProtectedRoute from './component/Route/ProtectedRoute';
import ProtectedRouteAdmin from './component/Route/ProtectedRouteAdmin';
import UpdatePassword from './component/User/UpdatePassword';
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword';
import Cart from './component/Cart/Cart';
import Shipping from './component/Cart/Shipping';
import ConfirmOrder from './component/Cart/ConfirmOrder';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { PaymentChild } from './component/Cart/PaymentChild';
import OrderSuccess from './component/Cart/OrderSuccess';
import MyOrders from './component/Order/MyOrders';
import OrderDetails from './component/Order/OrderDetails';
import Dashboard from './component/Admin/Dashboard';
import { LOAD_USER_FAIL } from './constants/userConstants';
import ProductList from './component/Admin/ProductList';
import NewProduct from './component/Admin/NewProduct.js';
import UpdateProduct from './component/Admin/UpdateProduct';
import OrderList from './component/Admin/OrderList.js';
import ProcessOrder from './component/Admin/ProcessOrder.js';
import UsersList from './component/Admin/UsersList.js';
import UpdateUser from './component/Admin/UpdateUser.js';
import ProductReviews from './component/Admin/ProductReviews.js';
import About from './component/layout/About/About.js';
import Contact from './component/layout/Contact/Contact.js';
import NotFound from './component/layout/NotFound/NotFound.js';

function App() {
  const [stripeApiKey, setStripeApiKey] = useState('');

  const dispatch = useDispatch();

  async function getStripeApiKey() {
    try {
      const { data } = await axios.get('/api/v1/stripeapikey');
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
    }
  }

  useLayoutEffect(() => {
    webfont.load({
      google: { families: ['Roboto', 'Droid Sans', 'chilanka'] },
    });

    dispatch(loadUser());

    getStripeApiKey();
  }, []);

  window.addEventListener('contextmenu', (e) => e.preventDefault());

  return (
    <>
      {}
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/product/:id" element={<ProductDetails />} />
            <Route exact path="/products" element={<Products />} />
            <Route path="/products/:keyword" element={<Products />} />
            <Route exact path="/search" element={<Search />} />
            <Route exact path="/login" element={<LoginSignUp />} />
            <Route exact path="/password/forgot" element={<ForgotPassword />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route
              exact
              path="/password/reset/:token"
              element={<ResetPassword />}
            />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/contact" element={<Contact />} />

            <Route element={<ProtectedRoute />}>
              <Route exact path="/account" element={<Profile />} />
              <Route exact path="/me/update" element={<UpdateProfile />} />
              <Route
                exact
                path="/password/update"
                element={<UpdatePassword />}
              />
              <Route exact path="/shipping" element={<Shipping />} />
              <Route exact path="/order/confirm" element={<ConfirmOrder />} />

              <Route
                exact
                path="/process/payment"
                element={<PaymentChild stripeApiKey={stripeApiKey} />}
              />
              <Route exact path="/success" element={<OrderSuccess />} />
              <Route exact path="/orders" element={<MyOrders />} />
              <Route exact path="/order/:id" element={<OrderDetails />} />
            </Route>
            <Route element={<ProtectedRouteAdmin />}>
              <Route exact path="/admin/dashboard" element={<Dashboard />} />
              <Route exact path="/admin/products" element={<ProductList />} />
              <Route exact path="/admin/product" element={<NewProduct />} />
              <Route
                exact
                path="/admin/product/:id"
                element={<UpdateProduct />}
              />
              <Route exact path="/admin/orders" element={<OrderList />} />
              <Route exact path="/admin/order/:id" element={<ProcessOrder />} />
              <Route exact path="/admin/users" element={<UsersList />} />
              <Route exact path="/admin/user/:id" element={<UpdateUser />} />
              <Route exact path="/admin/reviews" element={<ProductReviews />} />
            </Route>
            <Route exact path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
