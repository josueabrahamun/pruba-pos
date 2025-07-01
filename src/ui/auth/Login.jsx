import React from 'react';
import LoginForm from "../../modules/auth/components/LoginForm";

const Login = () => {
  return (
    <div className="font-sans min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-[#d8e0f1] w-[400px] p-8 rounded-xl shadow-md border border-gray-300">
        <h2 className="text-2xl font-bold text-center text-[#2d4373] mb-6">
          Iniciar sesión
        </h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
