import React, { useState } from 'react';
import { FaPlus, FaEdit, FaBoxOpen } from 'react-icons/fa';
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
    <div className="p-8 bg-white min-h-screen">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#395886]">Inventario</h1>
        <span className="text-gray-700 font-medium">Sergio Torres</span>
      </div>

      {/* Mensaje de éxito */}
      {mensaje && (
        <div className="flex items-center gap-2 bg-green-100 border border-green-400 text-green-800 px-4 py-2 mb-4 rounded">
          <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>{mensaje}</span>
        </div>
      )}

      {/* Contenedor tabla + botones encima */}
      <div className="flex gap-6">
        {/* Columna principal con botones y tabla */}
        <div className="flex-1">
          {/* Botones en la misma fila sobre la tabla */}
          <div className="flex justify-between items-center mb-2">
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-[#395886] hover:bg-[#314d71] text-white font-medium px-3 py-1.5 rounded-[10px] text-xs"
            >
              <FaPlus className="w-3 h-3" />
              Nuevo producto
            </button>

            <button
              onClick={() => {
                if (productos.length > 0) {
                  setProductoSeleccionado(productos[0]);
                  setShowEditModal(true);
                }
              }}
              className="flex items-center gap-2 bg-[#395886] hover:bg-[#314d71] text-white font-medium px-3 py-1.5 rounded-[10px] text-xs"
            >
              <FaEdit className="w-3 h-3" />
              Modificar producto
            </button>
          </div>

          {/* Tabla */}
          <table className="w-full border border-gray-300 text-sm">
            <thead className="bg-[#395886] text-white">
              <tr>
                <th className="p-3 text-center font-medium">Clave producto</th>
                <th className="p-3 text-center font-medium">Descripción</th>
                <th className="p-3 text-center font-medium">Cantidad</th>
                <th className="p-3 text-center font-medium">Precio</th>
              </tr>
            </thead>
            <tbody>
              {productos.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">
                    No hay productos en el inventario
                  </td>
                </tr>
              ) : (
                productos.map((prod, index) => (
                  <tr key={index} className="text-center border-t border-gray-200">
                    <td className="p-2">{prod.clave}</td>
                    <td className="p-2">{prod.descripcion}</td>
                    <td className="p-2">{prod.cantidad}</td>
                    <td className="p-2">${prod.precio.toFixed(2)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Sidebar derecho */}
        <div className="w-48 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium text-sm text-right">Cantidad actual:</label>
            <input
              type="text"
              readOnly
              value={productos.reduce((sum, p) => sum + p.cantidad, 0)}
              className="text-center border border-gray-300 rounded-[10px] bg-[#D5DEEF] font-medium text-lg py-2 h-10"
            />
          </div>

          <button
            onClick={() => {
              if (productos.length > 0) {
                setProductoSeleccionado(productos[0]);
                setShowQuantityModal(true);
              }
            }}
            className="flex items-center gap-2 justify-center bg-[#395886] hover:bg-[#314d71] text-white font-medium px-3 py-1.5 rounded-[10px] text-xs"
          >
            <FaBoxOpen className="w-3 h-3" />
            Agregar cantidad
          </button>
        </div>
      </div>

      {/* Formularios modales */}
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
          onUpdate={handleEditarProducto}
        />
      )}
    </div>
  );
};

export default Inventory;
