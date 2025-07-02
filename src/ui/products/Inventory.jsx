import React, { useState } from 'react';
import InventoryForm from '../../ui/products/components/IventoryForm';
import AddQuantityModal from '../../ui/products/components/AddQuantityModal';
import EditProductModal from '../../ui/products/components/EditProductModal';

const Inventory = () => {
  const [productos, setProductos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const mostrarMensaje = (msg) => {
    setMensaje(msg);
    setTimeout(() => setMensaje(''), 3000);
  };

  const handleAgregarProducto = (nuevoProducto) => {
    setProductos([...productos, nuevoProducto]);
    setShowForm(false);
    mostrarMensaje('Producto agregado correctamente');
  };

  const handleAgregarCantidad = (cantidad) => {
    if (productoSeleccionado) {
      const nuevosProductos = productos.map(p =>
        p.clave === productoSeleccionado.clave
          ? { ...p, cantidad: p.cantidad + cantidad }
          : p
      );
      setProductos(nuevosProductos);
      setShowQuantityModal(false);
      mostrarMensaje('Cantidad agregada correctamente');
    }
  };

  const handleEditarProducto = (productoEditado) => {
    const nuevosProductos = productos.map(p =>
      p.clave === productoEditado.clave ? productoEditado : p
    );
    setProductos(nuevosProductos);
    setShowEditModal(false);
    mostrarMensaje('Producto editado correctamente');
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-[#395886]">Inventario</h1>
        <span className="text-gray-700">Sergio Torres</span>
      </div>

      {mensaje && (
        <div className="flex items-center gap-2 bg-green-100 border border-green-400 text-green-800 px-4 py-2 mb-4 rounded">
          <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>{mensaje}</span>
        </div>
      )}

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setShowForm(true)}
          className="bg-[#395886] text-white px-4 py-2 rounded"
        >
          + Nuevo producto
        </button>
        <button
          onClick={() => {
            setProductoSeleccionado(productos[0]);
            setShowEditModal(true);
          }}
          className="bg-[#395886] text-white px-4 py-2 rounded"
        >
          ✎ Modificar producto
        </button>
        <div className="flex items-center gap-2">
          <span className="text-gray-700 font-semibold">Cantidad actual</span>
          <input
            type="text"
            readOnly
            value={productos.reduce((sum, p) => sum + p.cantidad, 0)}
            className="w-16 text-center border border-gray-300 rounded"
          />
          <button
            onClick={() => {
              setProductoSeleccionado(productos[0]);
              setShowQuantityModal(true);
            }}
            className="bg-[#395886] text-white px-3 py-1 rounded"
          >
            + Agregar cantidad
          </button>
        </div>
      </div>

      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-[#395886] text-white">
          <tr>
            <th className="p-2">Clave producto</th>
            <th className="p-2">Descripción</th>
            <th className="p-2">Cantidad</th>
            <th className="p-2">Precio</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod, index) => (
            <tr key={index} className="text-center border-t">
              <td>{prod.clave}</td>
              <td>{prod.descripcion}</td>
              <td>{prod.cantidad}</td>
              <td>${prod.precio.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <InventoryForm onClose={() => setShowForm(false)} onAdd={handleAgregarProducto} />
      )}
      {showQuantityModal && productoSeleccionado && (
        <AddQuantityModal
          producto={productoSeleccionado}
          onClose={() => setShowQuantityModal(false)}
          onAdd={handleAgregarCantidad}
        />
      )}
      {showEditModal && productoSeleccionado && (
        <EditProductModal
          producto={productoSeleccionado}
          onClose={() => setShowEditModal(false)}
          onSave={handleEditarProducto}
        />
      )}
    </div>
  );
};

export default Inventory;
