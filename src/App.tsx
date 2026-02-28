import {
  Search,
  Bell,
  Package,
  Mail,
  TrendingUp,
  ShoppingCart,
} from "lucide-react";
import { useAppLogic } from "./hooks/useAppLogic";
import { StatCard } from "./components/StatCard";
import { TableRow } from "./components/TableRow";
import "./styles/App.css";

export default function App() {
  const { activeTab, setActiveTab, navItems } = useAppLogic();

  return (
    <div className="layout-container">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="flex items-center gap-2">
            <Package className="h-8 w-8 text-blue-400" />
            <span className="sidebar-logo-text">Nexus ERP</span>
          </div>
        </div>

        <nav className="nav-menu">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`nav-button ${isActive ? "nav-button-active" : "nav-button-inactive"}`}
              >
                <Icon
                  className={`h-5 w-5 ${isActive ? "text-white" : "text-slate-400"}`}
                />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="user-avatar">AD</div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-semibold text-slate-200">
                Administrador
              </span>
              <span className="text-xs text-slate-500">Local JSON DB</span>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        {/* HEADER */}
        <header className="top-header">
          <div className="flex items-center gap-4 text-gray-500">
            <h1 className="header-title">{activeTab.replace("-", " ")}</h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="search-wrapper">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Buscar reportes..."
                className="search-input"
              />
            </div>
            <button className="notification-btn">
              <Bell className="h-6 w-6" />
              <span className="notification-dot"></span>
            </button>
          </div>
        </header>

        {/* ÁREA DE TRABAJO */}
        <div className="workspace">
          {activeTab === "dashboard" ? (
            <div className="space-y-6">
              <div className="card-grid">
                <StatCard
                  title="Ventas del Mes"
                  value="$24,500.00"
                  icon={TrendingUp}
                  color="text-emerald-600"
                  bg="bg-emerald-100"
                />
                <StatCard
                  title="Compras del Mes"
                  value="$12,340.00"
                  icon={ShoppingCart}
                  color="text-rose-600"
                  bg="bg-rose-100"
                />
                <StatCard
                  title="Correos Procesados"
                  value="142"
                  icon={Mail}
                  color="text-blue-600"
                  bg="bg-blue-100"
                />
                <StatCard
                  title="Productos Activos"
                  value="8,405"
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
                        <th className="pb-3 font-medium">
                          Cliente / Proveedor
                        </th>
                        <th className="pb-3 font-medium">Tipo</th>
                        <th className="pb-3 font-medium text-right">Monto</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <TableRow
                        fecha="2025-12-15"
                        doc="1571"
                        entidad="SAN FERNANDO S.A."
                        tipo="Venta"
                        monto="S/. 3,766.00"
                      />
                      <TableRow
                        fecha="2025-01-07"
                        doc="438"
                        entidad="RICOH DEL PERU S.A.C."
                        tipo="Venta"
                        monto="S/. 447.00"
                      />
                      <TableRow
                        fecha="2022-12-18"
                        doc="COMPRA"
                        entidad="SODIMAC"
                        tipo="Compra"
                        monto="S/. 478.40"
                      />
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
      </main>
    </div>
  );
}
