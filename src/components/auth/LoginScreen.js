import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { startLoginEmailPassword, startGoogleLogin } from '../../actions/auth';
import validator from 'validator';

export const LoginScreen = () => {

  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.ui);

  const [formValues, handleInputChange] = useForm({
    email: '',
    password: ''
  });

  const { email, password } = formValues;

  const handleLogin = e => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(startLoginEmailPassword(email, password));
    }
  }

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  }

  const isFormValid = () => {
    if (!validator.isEmail(email)) {
      return false;
    }

    if (password.length < 5) {
      return false;
    }
    return true;
  }

  return (
    <div>
      <h3 className='auth__title'>Login</h3>
      <form onSubmit={handleLogin}>
        <input
          type='text'
          placeholder='email'
          name='email'
          className='auth__input'
          value={email}
          onChange={handleInputChange}
        />
        <input
          type='password'
          placeholder='password'
          name='password'
          className='auth__input'
          value={password}
          onChange={handleInputChange}
        />

        <button
          tyoe='submit'
          className='btn btn-primary btn-block'
          disabled={loading}
        >Login</button>

        <div className='auth__social-networks'>
          <p>Logeate con redes sociales</p>
          <div
            className="google-btn"
            onClick={handleGoogleLogin}
          >
            <div className="google-icon-wrapper">
              <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>
        <Link to='/auth/register'>
          Crear nueva cuenta
        </Link>
      </form>
    </div>
  )
}
