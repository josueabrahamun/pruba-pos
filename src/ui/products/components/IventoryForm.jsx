import React, { useState } from 'react';

const InventoryForm = ({ onClose, onAdd }) => {
  const [clave, setClave] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precio, setPrecio] = useState('');

  const handleSubmit = () => {
    if (!clave || !descripcion || !cantidad || !precio) return;
    onAdd({ clave, descripcion, cantidad: parseInt(cantidad), precio: parseFloat(precio) });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-96 p-6 rounded shadow-md">
        <h2 className="text-lg font-bold mb-4 bg-[#395886] text-white p-2 rounded">Nuevo producto</h2>
        <label className="block font-semibold">Clave de producto:</label>
        <input type="text" className="w-full border p-1 mb-2" value={clave} onChange={e => setClave(e.target.value)} />
        <label className="block font-semibold">Descripción:</label>
        <input type="text" className="w-full border p-1 mb-2" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
        <label className="block font-semibold">Cantidad:</label>
        <input type="number" className="w-full border p-1 mb-2" value={cantidad} onChange={e => setCantidad(e.target.value)} />
        <label className="block font-semibold">Precio:</label>
        <input type="number" step="0.01" className="w-full border p-1 mb-4" value={precio} onChange={e => setPrecio(e.target.value)} />
        <div className="flex justify-between">
          <button className="bg-[#395886] text-white px-4 py-2 rounded" onClick={handleSubmit}>Agregar</button>
          <button className="bg-[#B21613] text-white px-4 py-2 rounded" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default InventoryForm;
