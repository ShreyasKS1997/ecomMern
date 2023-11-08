import React, { useEffect, useState } from 'react';
import './UpdatePassword.css';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, updatePassword } from '../../actions/userAction';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import { useNavigate } from 'react-router-dom';
import Loader from '../layout/loader/loader';
import MetaData from '../layout/MetaData';

const UpdatePassword = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState('');

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [newPassword, setNewPassword] = useState('');

  const [newConfirmPassword, setNewConfirmPassword] = useState('');

  const [oldPassVisible, setoldPassVisible] = useState(false);

  const [newPassVisible, setnewPassVisible] = useState(false);

  const [newConfirmPassVisible, setnewConfirmPassVisible] = useState(false);

  const oldPassVisToggle = () => {
    if (!oldPassVisible) {
      setoldPassVisible(true);
    } else {
      setoldPassVisible(false);
    }
  };

  const newPassVisToggle = () => {
    if (!newPassVisible) {
      setnewPassVisible(true);
    } else {
      setnewPassVisible(false);
    }
  };

  const newConfirmPassVisToggle = () => {
    if (!newConfirmPassVisible) {
      setnewConfirmPassVisible(true);
    } else {
      setnewConfirmPassVisible(false);
    }
  };

  useEffect(() => {
    if (error) {
      //handle error alert
      dispatch(clearErrors());
    }

    if (isUpdated) {
      //handle alert message successful message

      navigate('/account');

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, navigate, isUpdated]);

  const HandleChangePassword = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.set('oldPassword', oldPassword);
    formData.set('newPassword', newPassword);
    formData.set('newConfirmPassword', newConfirmPassword);

    dispatch(updatePassword(formData));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Change Password" />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Password</h2>
              <form
                className="updatePasswordForm"
                onSubmit={HandleChangePassword}
              >
                <div className="oldPasswordInputWrap">
                  <VpnKeyIcon />
                  <input
                    type={!oldPassVisible ? 'password' : 'text'}
                    className="oldPasswordInput"
                    name="oldPassword"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  {oldPassVisible ? (
                    <VisibilityIcon
                      className="visibilityIcon"
                      onClick={oldPassVisToggle}
                    />
                  ) : (
                    <VisibilityOffIcon
                      className="visibilityIcon"
                      onClick={oldPassVisToggle}
                    />
                  )}
                </div>
                <div className="newPasswordInputWrap">
                  <LockOpenIcon />
                  <input
                    type={!newPassVisible ? 'password' : 'text'}
                    className="newPasswordInput"
                    placeholder="New Password"
                    name="newPassword"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  {newPassVisible ? (
                    <VisibilityIcon
                      className="visibilityIcon"
                      onClick={newPassVisToggle}
                    />
                  ) : (
                    <VisibilityOffIcon
                      className="visibilityIcon"
                      onClick={newPassVisToggle}
                    />
                  )}
                </div>
                <div className="newConfirmPasswordInputWrap">
                  <LockIcon />
                  <input
                    type={!newConfirmPassVisible ? 'password' : 'text'}
                    className="newConfirmPasswordInput"
                    placeholder="Confirm New Password"
                    name="newConfirmPassword"
                    required
                    value={newConfirmPassword}
                    onChange={(e) => setNewConfirmPassword(e.target.value)}
                  />
                  {newConfirmPassVisible ? (
                    <VisibilityIcon
                      className="visibilityIcon"
                      onClick={newConfirmPassVisToggle}
                    />
                  ) : (
                    <VisibilityOffIcon
                      className="visibilityIcon"
                      onClick={newConfirmPassVisToggle}
                    />
                  )}
                </div>
                <input
                  type="submit"
                  className="changePasswordBtn"
                  value="Change Password"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdatePassword;
