import React, { useState } from 'react';
import { useRegisterMutation } from '../state/jobhunterApiSlice';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";

const Register = () => {
  const [register, { isLoading, error }] = useRegisterMutation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullname: '',
    role: 'jobseeker',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData).unwrap();
      alert('Sikeres regisztráció!');
      navigate('/login');
    } catch (err) {
      console.error('Sikertelen regisztráció:', err);
    }
  };

  const navigate = useNavigate();
  const handleLoginRedirect = () => {
    navigate('/login');
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
          Regisztrálj egy fiókot
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullname" className="block text-sm font-medium leading-6 text-white">
              Teljes név
            </label>
            <div className="mt-2">
              <input
                id="fullname"
                name="fullname"
                type="text"
                value={formData.fullname}
                onChange={handleChange}
                required
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
              Jelszó
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium leading-6 text-white">
              Szerepkör
            </label>
            <div className="mt-2">
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
              >
                <option value="jobseeker">Munkavállaló</option>
                <option value="company">Munkáltató</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-gradient-to-r from-amber-400 to-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm"
              disabled={isLoading}
            >
              {isLoading ? 'Regisztrálás...' : 'Regisztráció'}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Már van fiókod?{' '}
          <span
            onClick={handleLoginRedirect}
            className="cursor-pointer font-semibold leading-6 text-amber-400 hover:text-orange-600"
          >
            Jelentkezz be!
          </span>
        </p>
      </div>
      {error && <p className="mt-4 text-red-500">{error.data?.message || 'Regisztráció sikertelen.'}</p>}
    </div>
  );
};

export default Register;
