import React from 'react';
import { FaUser, FaLock } from 'react-icons/fa';

const Login = () => {
  return (
    <div className="font-poppins min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-[#d8e0f1] w-[400px] p-8 rounded-xl shadow-md border border-gray-300">
        <h2 className="text-2xl font-bold text-center text-[#2d4373] mb-6">
          Iniciar sesión
        </h2>

        {/* Campo de usuario */}
        <div className="mb-4">
          <label htmlFor="usuario" className="sr-only">
            Usuario
          </label>
          <div className="flex items-center border border-gray-400 rounded-md px-3 py-2 bg-white">
            <input
              type="text"
              id="usuario"
              placeholder="Usuario"
              className="flex-grow outline-none text-sm bg-transparent"
            />
            <FaUser className="text-gray-500 ml-2" />
          </div>
        </div>

        {/* Campo de contrseña*/}
        <div className="mb-6">
          <label htmlFor="contrasena" className="sr-only">
            Contraseña
          </label>
          <div className="flex items-center border border-gray-400 rounded-md px-3 py-2 bg-white">
            <input
              type="password"
              id="contrasena"
              placeholder="Contraseña"
              className="flex-grow outline-none text-sm bg-transparent"
            />
            <FaLock className="text-gray-500 ml-2" />
          </div>
        </div>

        {/* Botón de ingresar   EN preocesoDDDDDDDDD*/}
        <button className="w-full bg-[#3b568c] text-white font-semibold py-2 rounded-md hover:bg-[#2c4571] transition duration-200">
          Ingresar
        </button>
      </div>
    </div>
  );
};

export default Login;
