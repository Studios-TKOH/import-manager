import { useState } from "react";
import { Settings, Save, Database, Mail, User } from "lucide-react";

export function ConfiguracionView() {
    const [formData, setFormData] = useState({
        nombreUsuario: "Administrador",
        rol: "Admin",
        rutaBaseDatos: "C:/NexusERP/data/",
        imapHost: "imap.gmail.com",
        imapPuerto: 993,
        correo: "admin@nexuserp.com",
        password: ""
    });

    const [guardado, setGuardado] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'imapPuerto' ? Number(value) : value
        }));
        setGuardado(false);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setGuardado(true);
        setTimeout(() => setGuardado(false), 3000);
    };

    return (
        <div className="bg-white shadow mx-auto p-6 rounded-lg max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
                <Settings className="w-6 h-6 text-slate-600" />
                <h2 className="font-bold text-gray-800 text-xl">Ajustes del Sistema</h2>
            </div>

            <form onSubmit={handleSave} className="space-y-8">
                <div className="bg-slate-50 p-5 border border-slate-100 rounded-lg">
                    <div className="flex items-center gap-2 mb-4">
                        <User className="w-5 h-5 text-slate-500" />
                        <h3 className="font-semibold text-slate-700">Perfil de Usuario</h3>
                    </div>
                    <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                        <div>
                            <label className="block mb-1 font-medium text-gray-700 text-sm">Nombre</label>
                            <input
                                type="text"
                                name="nombreUsuario"
                                value={formData.nombreUsuario}
                                onChange={handleInputChange}
                                className="p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-slate-500 w-full text-sm"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium text-gray-700 text-sm">Rol</label>
                            <input
                                type="text"
                                name="rol"
                                value={formData.rol}
                                disabled
                                className="bg-gray-100 p-2 border border-gray-200 rounded-md w-full text-gray-500 text-sm cursor-not-allowed"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-emerald-50 p-5 border border-emerald-100 rounded-lg">
                    <div className="flex items-center gap-2 mb-4">
                        <Mail className="w-5 h-5 text-emerald-500" />
                        <h3 className="font-semibold text-emerald-700">Conexión IMAP (Lectura de Correos)</h3>
                    </div>
                    <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                        <div>
                            <label className="block mb-1 font-medium text-gray-700 text-sm">Servidor IMAP</label>
                            <input
                                type="text"
                                name="imapHost"
                                value={formData.imapHost}
                                onChange={handleInputChange}
                                className="p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-emerald-500 w-full text-sm"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium text-gray-700 text-sm">Puerto</label>
                            <input
                                type="number"
                                name="imapPuerto"
                                value={formData.imapPuerto}
                                onChange={handleInputChange}
                                className="p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-emerald-500 w-full text-sm"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium text-gray-700 text-sm">Correo Electrónico</label>
                            <input
                                type="email"
                                name="correo"
                                value={formData.correo}
                                onChange={handleInputChange}
                                className="p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-emerald-500 w-full text-sm"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium text-gray-700 text-sm">Contraseña de Aplicación</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="••••••••"
                                className="p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-emerald-500 w-full text-sm"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end items-center gap-4 pt-4">
                    {guardado && (
                        <span className="font-medium text-emerald-600 text-sm">¡Ajustes guardados correctamente!</span>
                    )}
                    <button
                        type="submit"
                        className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 px-6 py-2 rounded-md font-medium text-white text-sm transition-colors"
                    >
                        <Save className="w-4 h-4" />
                        Guardar Configuración
                    </button>
                </div>
            </form>
        </div>
    );
}