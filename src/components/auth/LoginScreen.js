import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { startLoginEmailPassword, startGoogleLogin } from '../../actions/auth';


export const LoginScreen = () => {

  const dispatch = useDispatch();

  const [formValues, handleInputChange] = useForm({
    email: 'fran@gmail.com',
    password: '123'
  });

  const { email, password } = formValues;

  const handleLogin = e => {
    e.preventDefault();
    dispatch(startLoginEmailPassword(email, password));
  }

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
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
