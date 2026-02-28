import { useState } from "react";
import { TrendingUp, Plus, Trash2, Edit2, X } from "lucide-react";
import { Transaccion } from "../types";
import ventasData from "../data/ventas.json";

export function VentasView() {
    const [ventas, setVentas] = useState<Transaccion[]>(
        ventasData.map((v: any) => ({
            ...v,
            entidad: v.cliente,
            tipo: 'Venta'
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

    const openEditForm = (venta: Transaccion) => {
        setEditingId(venta.id);
        setFormData({
            fecha: venta.fecha,
            documento: venta.documento,
            entidad: venta.entidad,
            producto: venta.producto,
            total: venta.total
        });
        setIsFormOpen(true);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingId) {
            setVentas(ventas.map(v =>
                v.id === editingId ? { ...v, ...formData } as Transaccion : v
            ));
        } else {
            const nuevaVenta: Transaccion = {
                ...formData,
                id: Date.now().toString(),
                tipo: 'Venta',
                precio_unitario: formData.total,
                moneda: 'SOLES',
                cantidad: 1,
                unidad: 'NIU'
            };
            setVentas([nuevaVenta, ...ventas]);
        }

        setIsFormOpen(false);
    };

    const handleDelete = (id: string) => {
        setVentas(ventas.filter(v => v.id !== id));
    };

    return (
        <div className="relative bg-white shadow p-6 rounded-lg">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <TrendingUp className="w-6 h-6 text-emerald-600" />
                    <h2 className="font-bold text-gray-800 text-xl">Registro de Ventas</h2>
                </div>
                <button
                    onClick={openNewForm}
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-md font-medium text-white text-sm transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Nueva Venta
                </button>
            </div>

            {isFormOpen && (
                <div className="bg-emerald-50 mb-8 p-5 border border-emerald-100 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-emerald-800">
                            {editingId ? "Editar Venta" : "Registrar Nueva Venta"}
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
                                className="p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-emerald-500 w-full text-sm"
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
                                className="p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-emerald-500 w-full text-sm"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium text-gray-700 text-xs">Cliente</label>
                            <input
                                type="text"
                                name="entidad"
                                value={formData.entidad}
                                onChange={handleInputChange}
                                required
                                className="p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-emerald-500 w-full text-sm"
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
                                className="p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-emerald-500 w-full text-sm"
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
                                className="p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-emerald-500 w-full text-sm"
                            />
                        </div>
                        <div className="flex justify-end md:col-span-5 mt-2">
                            <button
                                type="submit"
                                className="bg-gray-800 hover:bg-gray-900 px-6 py-2 rounded-md font-medium text-white text-sm transition-colors"
                            >
                                Guardar Venta
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
                            <th className="pb-3 font-medium text-gray-500">Cliente</th>
                            <th className="pb-3 font-medium text-gray-500">Producto</th>
                            <th className="pb-3 font-medium text-gray-500 text-right">Total</th>
                            <th className="pb-3 font-medium text-gray-500 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {ventas.map((venta) => (
                            <tr key={venta.id} className="hover:bg-gray-50 border-gray-50 border-b">
                                <td className="py-3 text-gray-600">{venta.fecha}</td>
                                <td className="py-3 text-gray-800">{venta.documento}</td>
                                <td className="py-3 text-gray-800">{venta.entidad}</td>
                                <td className="py-3 text-gray-600">{venta.producto}</td>
                                <td className="py-3 font-medium text-emerald-600 text-right">
                                    S/ {venta.total.toFixed(2)}
                                </td>
                                <td className="flex justify-center gap-2 py-3">
                                    <button
                                        onClick={() => openEditForm(venta)}
                                        className="hover:bg-blue-50 p-1 rounded text-blue-600"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(venta.id)}
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