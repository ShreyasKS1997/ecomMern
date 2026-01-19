import { useDispatch } from 'react-redux';
import './UserMenu.css';
import { logout } from '../../../actions/userAction';

export const UserMenu = () => {

    const dispatch = useDispatch();

    return (
        <div className="userMenuContainer">
            <a href='/admin/dashboard' className="userMenuContainerElement dashboardMenu">Dashboard</a>
            <a href='/orders' className="userMenuContainerElement ordersMenu">Orders</a>
            <a href='/account' className="userMenuContainerElement profileMenu">Profile</a>
            <a href='/cart' className="userMenuContainerElement cardMenu">Cart</a>
            <a onClick={() => dispatch(logout())} className="userMenuContainerElement logoutMenu">Logout</a>
        </div>
    )
}