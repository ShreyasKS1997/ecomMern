import { useEffect } from 'react';
import { CgMouse } from 'react-icons/cg';
import './Home.css';
import Product from './Product.js';
import MetaData from '../layout/MetaData';

import { getProduct } from '../../actions/productAction';

import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layout/loader/loader';
import AlertCustom from '../User/Alert.js';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Home Page" />
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products && products.map((product) => <Product product={product} />)}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
