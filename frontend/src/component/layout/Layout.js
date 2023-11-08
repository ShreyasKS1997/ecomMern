import { Outlet } from 'react-router-dom';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import { useSelector } from 'react-redux';
import UserOptions from './Header/UserOptions';

const Layout = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
