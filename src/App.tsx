import { Package, Mail, TrendingUp, ShoppingCart } from "lucide-react";
import { useAppLogic } from "./hooks/useAppLogic";
import { StatCard } from "./components/StatCard";
import { TableRow } from "./components/TableRow";
import "./styles/App.css";
import { MainLayout } from "./layouts/MainLayout";

export default function App() {
  const {
    activeTab,
    setActiveTab,
    navItems,
    ultimasTransacciones,
    totalVentas,
    totalCompras,
    totalProductos,
    correosProcesados,
  } = useAppLogic();

  return (
    <MainLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      navItems={navItems}
    >
      {/* ÁREA DE TRABAJO */}
      <div className="workspace">
        {activeTab === "dashboard" ? (
          <div className="space-y-6">
            <div className="card-grid">
              <StatCard
                title="Total Ventas (Soles)"
                value={totalVentas}
                icon={TrendingUp}
                color="text-emerald-600"
                bg="bg-emerald-100"
              />
              <StatCard
                title="Total Compras (Soles)"
                value={totalCompras}
                icon={ShoppingCart}
                color="text-rose-600"
                bg="bg-rose-100"
              />
              <StatCard
                title="Correos Procesados"
                value={correosProcesados}
                icon={Mail}
                color="text-blue-600"
                bg="bg-blue-100"
              />
              <StatCard
                title="Productos Activos"
                value={totalProductos}
                icon={Package}
                color="text-amber-600"
                bg="bg-amber-100"
              />
            </div>

            <div className="table-container">
              <div className="flex items-center justify-between mb-6">
                <h2 className="table-title">
                  Últimas Transacciones Registradas
                </h2>
                <button className="table-link">Ver todo</button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="table-header">
                      <th className="pb-3 font-medium">Fecha</th>
                      <th className="pb-3 font-medium">Factura / Doc.</th>
                      <th className="pb-3 font-medium">Cliente / Proveedor</th>
                      <th className="pb-3 font-medium">Tipo</th>
                      <th className="pb-3 font-medium text-right">Monto</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {ultimasTransacciones.map((transaccion) => (
                      <TableRow
                        key={transaccion.id}
                        transaccion={transaccion}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="status-banner">
              <div>
                <h3 className="font-bold text-lg mb-1">
                  Estado del Sistema Local
                </h3>
                <p className="text-blue-100 text-sm">
                  Archivos JSON listos para ser configurados.
                </p>
              </div>
              <div className="status-pill">
                <div className="status-dot"></div>
                Esperando conexión
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-400">
            <Package className="h-16 w-16 mb-4 text-gray-300 opacity-50" />
            <h2 className="text-xl font-medium text-gray-600 mb-2">
              Módulo en Construcción
            </h2>
            <p className="text-sm text-center max-w-md">
              Esta es la vista de <strong>{activeTab}</strong>.
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
