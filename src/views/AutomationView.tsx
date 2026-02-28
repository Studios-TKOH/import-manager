import { Mail } from "lucide-react";
import { Correo } from "../types";
import correosData from "../data/correos.json";

export function AutomatizacionView() {
    const correos: Correo[] = correosData as Correo[];

    return (
        <div className="bg-white shadow p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-6">
                <Mail className="w-6 h-6 text-blue-600" />
                <h2 className="font-bold text-gray-800 text-xl">Buzón de Automatización</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-gray-100 border-b-2">
                            <th className="pb-3 font-medium text-gray-500">Fecha</th>
                            <th className="pb-3 font-medium text-gray-500">Remitente</th>
                            <th className="pb-3 font-medium text-gray-500">Asunto</th>
                            <th className="pb-3 font-medium text-gray-500 text-center">Estado</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {correos.map((correo) => (
                            <tr key={correo.id} className="hover:bg-gray-50 border-gray-50 border-b">
                                <td className="py-3 text-gray-600">{correo.fecha}</td>
                                <td className="py-3 font-medium text-gray-800">{correo.remitente}</td>
                                <td className="py-3 text-gray-600">{correo.asunto}</td>
                                <td className="py-3 text-center">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${correo.procesado
                                            ? 'bg-emerald-100 text-emerald-700'
                                            : 'bg-amber-100 text-amber-700'
                                        }`}>
                                        {correo.procesado ? 'Procesado' : 'Pendiente'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}