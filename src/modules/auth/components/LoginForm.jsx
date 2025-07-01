import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [errores, setErrores] = useState({});
  const navigate = useNavigate();

  // Función para validar los campos del formulario
  const validarCampos = () => {
    const erroresTemp = {};
    if (!usuario.trim()) erroresTemp.usuario = 'El usuario es obligatorio';
    if (!contrasena.trim()) erroresTemp.contrasena = 'La contraseña es obligatoria';
    setErrores(erroresTemp);
    return Object.keys(erroresTemp).length === 0; // Retorna true si no hay errores
  };

  // Función principal de login que realiza la petición al backend
  const handleLogin = async () => {
    if (!validarCampos()) return; // Detiene si hay campos vacíos

    try {
      // Envío de datos al backend para verificar credenciales
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, contrasena }),
      });

      const data = await response.json();

      if (data.success) {
        // Si login exitoso, se guarda usuario y rol en localStorage
        setMensaje(`Bienvenido ${data.rol === 'admin' ? 'Administrador' : 'Cajero'}`);
        localStorage.setItem('usuario', usuario);
        localStorage.setItem('rol', data.rol);

        // Redirección a otra vista tras breve pausa
        setTimeout(() => navigate('/prefixScreen'), 1000);
      } else {
        // Si credenciales incorrectas
        setMensaje('Credenciales inválidas');
        setContrasena('');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setMensaje('No se pudo conectar con el servidor');
    }
  };

  return (
    <>
      {/* Campo de Usuario con validación visual */}
      <div className="mb-4">
        <div className={`flex items-center border ${errores.usuario ? 'border-red-500' : 'border-gray-400'} rounded-md px-3 py-2 bg-white`}>
          <input
            type="text"
            placeholder="Usuario"
            className="flex-grow outline-none text-sm bg-transparent"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <FaUser className="text-gray-500 ml-2" />
        </div>
        {errores.usuario && <p className="text-red-500 text-xs mt-1">{errores.usuario}</p>}
      </div>

      {/* Campo de Contraseña con validación visual */}
      <div className="mb-6">
        <div className={`flex items-center border ${errores.contrasena ? 'border-red-500' : 'border-gray-400'} rounded-md px-3 py-2 bg-white`}>
          <input
            type="password"
            placeholder="Contraseña"
            className="flex-grow outline-none text-sm bg-transparent"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
          <FaLock className="text-gray-500 ml-2" />
        </div>
        {errores.contrasena && <p className="text-red-500 text-xs mt-1">{errores.contrasena}</p>}
      </div>

      {/* Botón de login */}
      <button
        onClick={handleLogin}
        className="w-full bg-[#3b568c] text-white font-semibold py-2 rounded-md hover:bg-[#2c4571] transition duration-200"
      >
        Ingresar
      </button>

      {/* Mensaje de error o éxito */}
      {mensaje && (
        <p className="text-center text-sm text-red-500 mt-4">{mensaje}</p>
      )}
    </>
  );
};

export default LoginForm;
