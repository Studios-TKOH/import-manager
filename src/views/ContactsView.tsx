import { useState } from "react";
import { Users, Plus, Trash2, Edit2, X } from "lucide-react";
import { Contacto } from "../types";
import contactosData from "../data/contactos.json";

export function ContactosView() {
    const [contactos, setContactos] = useState<Contacto[]>(contactosData as Contacto[]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [formData, setFormData] = useState<{ nombre: string, ruc: string, tipo: 'Cliente' | 'Proveedor' }>({
        nombre: "",
        ruc: "",
        tipo: "Cliente"
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const openNewForm = () => {
        setEditingId(null);
        setFormData({ nombre: "", ruc: "", tipo: "Cliente" });
        setIsFormOpen(true);
    };

    const openEditForm = (contacto: Contacto) => {
        setEditingId(contacto.id);
        setFormData({
            nombre: contacto.nombre,
            ruc: contacto.ruc,
            tipo: contacto.tipo
        });
        setIsFormOpen(true);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingId) {
            setContactos(contactos.map(c =>
                c.id === editingId ? { ...formData, id: editingId } as Contacto : c
            ));
        } else {
            const nuevoContacto: Contacto = {
                ...formData,
                id: Date.now().toString()
            };
            setContactos([...contactos, nuevoContacto]);
        }

        setIsFormOpen(false);
    };

    const handleDelete = (id: string) => {
        setContactos(contactos.filter(c => c.id !== id));
    };

    return (
        <div className="relative bg-white shadow p-6 rounded-lg">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-purple-600" />
                    <h2 className="font-bold text-gray-800 text-xl">Directorio de Contactos</h2>
                </div>
                <button
                    onClick={openNewForm}
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md font-medium text-white text-sm transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Nuevo Contacto
                </button>
            </div>

            {isFormOpen && (
                <div className="bg-purple-50 mb-8 p-5 border border-purple-100 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-purple-800">
                            {editingId ? "Editar Contacto" : "Agregar Nuevo Contacto"}
                        </h3>
                        <button onClick={() => setIsFormOpen(false)} className="text-gray-500 hover:text-gray-800">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSave} className="gap-4 grid grid-cols-1 md:grid-cols-3">
                        <div>
                            <label className="block mb-1 font-medium text-gray-700 text-xs">Nombre / Razón Social</label>
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleInputChange}
                                required
                                className="p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-purple-500 w-full text-sm"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium text-gray-700 text-xs">RUC / DNI</label>
                            <input
                                type="text"
                                name="ruc"
                                value={formData.ruc}
                                onChange={handleInputChange}
                                required
                                className="p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-purple-500 w-full text-sm"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium text-gray-700 text-xs">Tipo de Contacto</label>
                            <select
                                name="tipo"
                                value={formData.tipo}
                                onChange={handleInputChange}
                                className="bg-white p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-purple-500 w-full text-sm"
                            >
                                <option value="Cliente">Cliente</option>
                                <option value="Proveedor">Proveedor</option>
                            </select>
                        </div>
                        <div className="flex justify-end md:col-span-3 mt-2">
                            <button
                                type="submit"
                                className="bg-gray-800 hover:bg-gray-900 px-6 py-2 rounded-md font-medium text-white text-sm transition-colors"
                            >
                                Guardar Contacto
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-gray-100 border-b-2">
                            <th className="pb-3 font-medium text-gray-500">Nombre / Razón Social</th>
                            <th className="pb-3 font-medium text-gray-500">RUC / DNI</th>
                            <th className="pb-3 font-medium text-gray-500">Tipo</th>
                            <th className="pb-3 font-medium text-gray-500 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {contactos.map((contacto) => (
                            <tr key={contacto.id} className="hover:bg-gray-50 border-gray-50 border-b">
                                <td className="py-3 font-medium text-gray-800">{contacto.nombre}</td>
                                <td className="py-3 text-gray-600">{contacto.ruc}</td>
                                <td className="py-3">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${contacto.tipo === 'Cliente'
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'bg-orange-100 text-orange-700'
                                        }`}>
                                        {contacto.tipo}
                                    </span>
                                </td>
                                <td className="flex justify-center gap-2 py-3">
                                    <button
                                        onClick={() => openEditForm(contacto)}
                                        className="hover:bg-blue-50 p-1 rounded text-blue-600"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(contacto.id)}
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