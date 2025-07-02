import React, { useState } from 'react';

const AddQuantityModal = ({ producto, onClose, onAdd }) => {
  const [cantidad, setCantidad] = useState('');

  const handleAdd = () => {
    const cantidadNum = parseInt(cantidad);
    if (!isNaN(cantidadNum) && cantidadNum > 0) {
      onAdd(cantidadNum);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-80 p-6 rounded shadow-md">
        <h2 className="text-lg font-bold mb-4 bg-[#395886] text-white p-2 rounded">Cantidad</h2>
        <label className="block font-semibold mb-1">Cantidad:</label>
        <input
          type="number"
          value={cantidad}
          onChange={e => setCantidad(e.target.value)}
          className="w-full border p-2 mb-4"
        />
        <div className="flex justify-between">
          <button className="bg-[#395886] text-white px-4 py-2 rounded" onClick={handleAdd}>Agregar</button>
          <button className="bg-[#B21613] text-white px-4 py-2 rounded" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default AddQuantityModal;
