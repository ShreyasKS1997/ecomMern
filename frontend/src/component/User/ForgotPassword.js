import React, { useEffect, useState } from 'react';
import './ForgotPassword.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPassword } from '../../actions/userAction';
import Loader from '../layout/loader/loader';

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const HandleForgotPasswordSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.set('email', forgotPasswordEmail);

    dispatch(forgotPassword(formData));
  };

  //todo handle alerts

  useEffect(() => {
    if (error) {
      //todo alert error
      dispatch(clearErrors());
    }

    if (message) {
      //todo alert success
    }
  });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="forgotPassword">
            <form type="email" onSubmit={HandleForgotPasswordSubmit}>
              <h2>Password Reset Assistance</h2>
              <div>
                Enter your registered email address to reset the password.
              </div>
              <h4 style={{ paddingBottom: '6px' }}>Email address</h4>
              <input
                type="email"
                name="email"
                value={forgotPasswordEmail}
                onChange={(e) => setForgotPasswordEmail(e.target.value)}
              />
              <input type="submit" value="Submit" />
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default ForgotPassword;
