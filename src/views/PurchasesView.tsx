import { useState } from "react";
import { ShoppingCart, Plus, Trash2, Edit2, X } from "lucide-react";
import { Transaccion } from "../types";
import comprasData from "../data/compras.json";

export function ComprasView() {
    const [compras, setCompras] = useState<Transaccion[]>(
        comprasData.map((c: any) => ({
            ...c,
            entidad: c.proveedor,
            tipo: 'Compra'
        })) as Transaccion[]
    );

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        fecha: "",
        documento: "",
        entidad: "",
        producto: "",
        total: 0
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'total' ? Number(value) : value
        }));
    };

    const openNewForm = () => {
        setEditingId(null);
        setFormData({
            fecha: new Date().toISOString().split('T')[0],
            documento: "",
            entidad: "",
            producto: "",
            total: 0
        });
        setIsFormOpen(true);
    };

    const openEditForm = (compra: Transaccion) => {
        setEditingId(compra.id);
        setFormData({
            fecha: compra.fecha,
            documento: compra.documento,
            entidad: compra.entidad,
            producto: compra.producto,
            total: compra.total
        });
        setIsFormOpen(true);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingId) {
            setCompras(compras.map(c =>
                c.id === editingId ? { ...c, ...formData } as Transaccion : c
            ));
        } else {
            const nuevaCompra: Transaccion = {
                ...formData,
                id: Date.now().toString(),
                tipo: 'Compra',
                precio_unitario: formData.total,
                moneda: 'SOLES',
                cantidad: 1,
                unidad: 'NIU'
            };
            setCompras([nuevaCompra, ...compras]);
        }

        setIsFormOpen(false);
    };

    const handleDelete = (id: string) => {
        setCompras(compras.filter(c => c.id !== id));
    };

    return (
        <div className="relative bg-white shadow p-6 rounded-lg">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <ShoppingCart className="w-6 h-6 text-rose-600" />
                    <h2 className="font-bold text-gray-800 text-xl">Registro de Compras</h2>
                </div>
                <button
                    onClick={openNewForm}
                    className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 px-4 py-2 rounded-md font-medium text-white text-sm transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Nueva Compra
                </button>
            </div>

            {isFormOpen && (
                <div className="bg-rose-50 mb-8 p-5 border border-rose-100 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-rose-800">
                            {editingId ? "Editar Compra" : "Registrar Nueva Compra"}
                        </h3>
                        <button onClick={() => setIsFormOpen(false)} className="text-gray-500 hover:text-gray-800">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSave} className="gap-4 grid grid-cols-1 md:grid-cols-5">
                        <div>
                            <label className="block mb-1 font-medium text-gray-700 text-xs">Fecha</label>
                            <input
                                type="date"
                                name="fecha"
                                value={formData.fecha}
                                onChange={handleInputChange}
                                required
                                className="p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-rose-500 w-full text-sm"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium text-gray-700 text-xs">Documento</label>
                            <input
                                type="text"
                                name="documento"
                                value={formData.documento}
                                onChange={handleInputChange}
                                placeholder="Ej. F001-000123"
                                required
                                className="p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-rose-500 w-full text-sm"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium text-gray-700 text-xs">Proveedor</label>
                            <input
                                type="text"
                                name="entidad"
                                value={formData.entidad}
                                onChange={handleInputChange}
                                required
                                className="p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-rose-500 w-full text-sm"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium text-gray-700 text-xs">Producto</label>
                            <input
                                type="text"
                                name="producto"
                                value={formData.producto}
                                onChange={handleInputChange}
                                required
                                className="p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-rose-500 w-full text-sm"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium text-gray-700 text-xs">Total (S/)</label>
                            <input
                                type="number"
                                name="total"
                                value={formData.total}
                                onChange={handleInputChange}
                                required
                                min="0"
                                step="0.01"
                                className="p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-rose-500 w-full text-sm"
                            />
                        </div>
                        <div className="flex justify-end md:col-span-5 mt-2">
                            <button
                                type="submit"
                                className="bg-gray-800 hover:bg-gray-900 px-6 py-2 rounded-md font-medium text-white text-sm transition-colors"
                            >
                                Guardar Compra
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-gray-100 border-b-2">
                            <th className="pb-3 font-medium text-gray-500">Fecha</th>
                            <th className="pb-3 font-medium text-gray-500">Documento</th>
                            <th className="pb-3 font-medium text-gray-500">Proveedor</th>
                            <th className="pb-3 font-medium text-gray-500">Producto</th>
                            <th className="pb-3 font-medium text-gray-500 text-right">Total</th>
                            <th className="pb-3 font-medium text-gray-500 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {compras.map((compra) => (
                            <tr key={compra.id} className="hover:bg-gray-50 border-gray-50 border-b">
                                <td className="py-3 text-gray-600">{compra.fecha}</td>
                                <td className="py-3 text-gray-800">{compra.documento}</td>
                                <td className="py-3 text-gray-800">{compra.entidad}</td>
                                <td className="py-3 text-gray-600">{compra.producto}</td>
                                <td className="py-3 font-medium text-rose-600 text-right">
                                    S/ {compra.total.toFixed(2)}
                                </td>
                                <td className="flex justify-center gap-2 py-3">
                                    <button
                                        onClick={() => openEditForm(compra)}
                                        className="hover:bg-blue-50 p-1 rounded text-blue-600"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(compra.id)}
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