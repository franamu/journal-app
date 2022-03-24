import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { setError, removeError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

  const dispatch = useDispatch();
  const { msgError } = useSelector(state => state.ui);

  const [formValues, handleInputChange] = useForm({
    name: '',
    email: '',
    password1: '',
    password2: ''
  });

  const { name, email, password1, password2 } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(startRegisterWithEmailPasswordName(email, password1, name));
    }
  }

  const isFormValid = () => {

    if (name.trim().length === 0) {
      dispatch(setError('nombre es requerido'));
      return false;
    };

    if (!validator.isEmail(email)) {
      dispatch(setError('Email inválido'));
      return false;
    };

    if (password1 !== password2 || password1.length < 5) {
      dispatch(setError('La contraseña deben ser iguales y mayor a 5 caracteres'));
      return false;
    };
    console.log('esa');
    dispatch(removeError());
    return true;
  }

  return (
    <>
      <h3 className="auth__title">Register</h3>

      <form onSubmit={handleRegister}>

        {msgError && (
          <div className='auth__alert-error'>
            {msgError}
          </div>
        )}
        <input
          type="text"
          placeholder="Name"
          name="name"
          className="auth__input"
          autoComplete="off"
          onChange={handleInputChange}
        />

        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          onChange={handleInputChange}
        />

        <input
          type="password"
          placeholder="Password"
          name="password1"
          className="auth__input"
          onChange={handleInputChange}
        />

        <input
          type="password"
          placeholder="Confirm password"
          name="password2"
          className="auth__input"
          onChange={handleInputChange}
        />


        <button
          type="submit"
          className="btn btn-primary btn-block mb-5"
        >
          Register
        </button>



        <Link
          to="/auth/login"
          className="link"
        >
          Already registered?
        </Link>

      </form>
    </>
  )
}
