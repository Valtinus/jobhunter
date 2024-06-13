import React, { useState } from 'react';
import { useLoginMutation } from '../state/jobhunterApiSlice';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";

const Login = ({ setUser }) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({ ...formState, strategy: 'local' }).unwrap();
      setUser(userData);
      navigate('/');
      alert('Sikeres bejelentkezés!');
    } catch (err) {
      console.error('Sikertelen bejelentkezés:', err);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="mt-10 w-96 justify-center px-6 py-12 lg:px-8 bg-gray-800 rounded-xl">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-20 w-auto"
          src={logo}
          alt="Jobhunter"
        />
        <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Lépj be a fiókodba
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formState.email}
                onChange={handleChange}
                required
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                Jelszó
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-amber-400 hover:text-orange-600">
                  Elfelejtetted a jelszavad?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={formState.password}
                onChange={handleChange}
                required
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-gradient-to-r from-amber-400 to-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm"
              disabled={isLoading}
            >
              {isLoading ? 'Bejelentkezés...' : 'Bejelentkezés'}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Már van fiókod?{' '}
          <span
            onClick={handleLoginRedirect}
            className="cursor-pointer font-semibold leading-6 text-amber-400 hover:text-orange-600"
          >
            Regisztrálj!
          </span>
        </p>
      </div>
      {error && <p className="mt-4 text-red-500">{error.data?.message || 'Bejelentkezés sikertelen.'}</p>}
    </div>
  );
};

export default Login;
