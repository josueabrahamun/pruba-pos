import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, contrasena }),
      });

      const data = await response.json();

      if (data.success) {
        setMensaje(`Bienvenido ${data.rol === 'admin' ? 'Administrador' : 'Cajero'}`);
        // Aquí puedes redirigir según rol si usas React Router
        // ej: navigate('/admin') o navigate('/caja')
      } else {
        setMensaje(data.message);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setMensaje('Error al conectar con el servidor');
    }
  };

  return (
    <div className="font-poppins min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-[#d8e0f1] w-[400px] p-8 rounded-xl shadow-md border border-gray-300">
        <h2 className="text-2xl font-bold text-center text-[#2d4373] mb-6">
          Iniciar sesión
        </h2>

        <div className="mb-4">
          <div className="flex items-center border border-gray-400 rounded-md px-3 py-2 bg-white">
            <input
              type="text"
              placeholder="Usuario"
              className="flex-grow outline-none text-sm bg-transparent"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
            <FaUser className="text-gray-500 ml-2" />
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center border border-gray-400 rounded-md px-3 py-2 bg-white">
            <input
              type="password"
              placeholder="Contraseña"
              className="flex-grow outline-none text-sm bg-transparent"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
            <FaLock className="text-gray-500 ml-2" />
          </div>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-[#3b568c] text-white font-semibold py-2 rounded-md hover:bg-[#2c4571] transition duration-200"
        >
          Ingresar
        </button>

        {mensaje && (
          <p className="text-center text-sm text-red-500 mt-4">{mensaje}</p>
        )}
      </div>
    </div>
  );
};

export default Login;
