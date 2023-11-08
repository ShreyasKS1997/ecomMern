import React, { useEffect, useState } from 'react';
import './ResetPassword.css';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, resetPassword } from '../../actions/userAction';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../layout/loader/loader';
import MetaData from '../layout/MetaData';

const ResetPassword = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const params = useParams();

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [newPassword, setNewPassword] = useState('');

  const [newConfirmPassword, setNewConfirmPassword] = useState('');

  const [newPassVisible, setnewPassVisible] = useState(false);

  const [newConfirmPassVisible, setnewConfirmPassVisible] = useState(false);

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

    if (success) {
      //handle alert message successful message

      navigate('/account');

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, navigate, success]);

  const HandleChangePassword = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.set('password', newPassword);
    formData.set('confirmPassword', newConfirmPassword);

    dispatch(resetPassword(params.token, formData));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Change Password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Reset Password</h2>
              <form
                className="resetPasswordForm"
                onSubmit={HandleChangePassword}
              >
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

export default ResetPassword;
