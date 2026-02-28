import { useState } from "react";
import { Package, Plus, Trash2, Edit2, X } from "lucide-react";
import { Producto } from "../types";
import inventarioData from "../data/inventario.json";

export function InventarioView() {
  const [productos, setProductos] = useState<Producto[]>(inventarioData as Producto[]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    codigo: "",
    descripcion: "",
    stock: 0,
    precio: 0
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'stock' || name === 'precio' ? Number(value) : value
    }));
  };

  const openNewForm = () => {
    setEditingId(null);
    setFormData({ codigo: "", descripcion: "", stock: 0, precio: 0 });
    setIsFormOpen(true);
  };

  const openEditForm = (producto: Producto) => {
    setEditingId(producto.id);
    setFormData({
      codigo: producto.codigo,
      descripcion: producto.descripcion,
      stock: producto.stock,
      precio: producto.precio
    });
    setIsFormOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      setProductos(productos.map(p => 
        p.id === editingId ? { ...formData, id: editingId } as Producto : p
      ));
    } else {
      const nuevoProducto: Producto = {
        ...formData,
        id: Date.now().toString()
      };
      setProductos([...productos, nuevoProducto]);
    }
    
    setIsFormOpen(false);
  };

  const handleDelete = (id: string) => {
    setProductos(productos.filter(p => p.id !== id));
  };

  return (
    <div className="relative bg-white shadow p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <Package className="w-6 h-6 text-amber-600" />
          <h2 className="font-bold text-gray-800 text-xl">Control de Inventario</h2>
        </div>
        <button 
          onClick={openNewForm}
          className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-md font-medium text-white text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nuevo Producto
        </button>
      </div>

      {isFormOpen && (
        <div className="bg-amber-50 mb-8 p-5 border border-amber-100 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-amber-800">
              {editingId ? "Editar Producto" : "Agregar Nuevo Producto"}
            </h3>
            <button onClick={() => setIsFormOpen(false)} className="text-gray-500 hover:text-gray-800">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={handleSave} className="gap-4 grid grid-cols-1 md:grid-cols-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-xs">Código</label>
              <input
                type="text"
                name="codigo"
                value={formData.codigo}
                onChange={handleInputChange}
                required
                className="p-2 border border-gray-300 focus:border-amber-500 rounded-md outline-none focus:ring-2 focus:ring-amber-500 w-full text-sm"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-xs">Descripción</label>
              <input
                type="text"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                required
                className="p-2 border border-gray-300 focus:border-amber-500 rounded-md outline-none focus:ring-2 focus:ring-amber-500 w-full text-sm"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-xs">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                required
                min="0"
                className="p-2 border border-gray-300 focus:border-amber-500 rounded-md outline-none focus:ring-2 focus:ring-amber-500 w-full text-sm"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-xs">Precio Unitario (S/)</label>
              <input
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
                className="p-2 border border-gray-300 focus:border-amber-500 rounded-md outline-none focus:ring-2 focus:ring-amber-500 w-full text-sm"
              />
            </div>
            <div className="flex justify-end md:col-span-4 mt-2">
              <button 
                type="submit"
                className="bg-gray-800 hover:bg-gray-900 px-6 py-2 rounded-md font-medium text-white text-sm transition-colors"
              >
                Guardar Producto
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-gray-100 border-b-2">
              <th className="pb-3 font-medium text-gray-500">Código</th>
              <th className="pb-3 font-medium text-gray-500">Descripción</th>
              <th className="pb-3 font-medium text-gray-500 text-right">Stock</th>
              <th className="pb-3 font-medium text-gray-500 text-right">Precio Unitario</th>
              <th className="pb-3 font-medium text-gray-500 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {productos.map((producto) => (
              <tr key={producto.id} className="hover:bg-gray-50 border-gray-50 border-b">
                <td className="py-3 font-medium text-gray-600">{producto.codigo}</td>
                <td className="py-3 text-gray-800">{producto.descripcion}</td>
                <td className="py-3 font-medium text-right">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    producto.stock > 10 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {producto.stock}
                  </span>
                </td>
                <td className="py-3 text-gray-600 text-right">S/ {producto.precio.toFixed(2)}</td>
                <td className="flex justify-center gap-2 py-3">
                  <button 
                    onClick={() => openEditForm(producto)}
                    className="hover:bg-blue-50 p-1 rounded text-blue-600"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(producto.id)}
                    className="hover:bg-red-50 p-1 rounded text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}