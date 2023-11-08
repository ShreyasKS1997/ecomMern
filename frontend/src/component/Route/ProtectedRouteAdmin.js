import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import Loader from '../layout/loader/loader';

const ProtectedRouteAdmin = ({ component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  const navigate = useNavigate();

  if (!loading) {
    if (isAuthenticated === false || isAuthenticated === true) {
      if (isAuthenticated === false && loading === false) {
        navigate('/login');
      } else {
        if (user.role !== 'admin') {
          navigate('/account');
        } else {
          return <Outlet />;
        }
      }
    } else {
      return <Loader />;
    }
  } else {
    return <Loader />;
  }
};

export default ProtectedRouteAdmin;
