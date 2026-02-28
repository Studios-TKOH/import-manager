import { Package, Mail, TrendingUp, ShoppingCart } from "lucide-react";
import { useAppLogic } from "./hooks/useAppLogic";
import { StatCard } from "./components/StatCard";
import { TableRow } from "./components/TableRow";
import { MainLayout } from "./layouts/MainLayout";
import { InventarioView } from "./views/InventoryView";
import { VentasView } from "./views/SalesView";
import { ComprasView } from "./views/PurchasesView";
import { ContactosView } from "./views/ContactsView";
import { AutomatizacionView } from "./views/AutomationView";
import "./styles/App.css";

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

  const renderDashboard = () => (
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
        <div className="flex justify-between items-center mb-6">
          <h2 className="table-title">Últimas Transacciones Registradas</h2>
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
                <TableRow key={transaccion.id} transaccion={transaccion} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="status-banner">
        <div>
          <h3 className="mb-1 font-bold text-lg">Estado del Sistema Local</h3>
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
  );

  const renderPlaceholder = (moduleName: string) => (
    <div className="flex flex-col justify-center items-center h-full text-gray-400">
      <Package className="opacity-50 mb-4 w-16 h-16 text-gray-300" />
      <h2 className="mb-2 font-medium text-gray-600 text-xl">
        Módulo en Construcción
      </h2>
      <p className="max-w-md text-sm text-center">
        Esta es la vista de <strong>{moduleName}</strong>.
      </p>
    </div>
  );

  const renderActiveView = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard();
      case "ventas":
        return <VentasView />;
      case "compras":
        return <ComprasView />;
      case "inventario":
        return <InventarioView />;
      case "contactos":
        return <ContactosView />;
      case "automatizacion":
        return <AutomatizacionView />;
      default:
        return renderPlaceholder(activeTab);
    }
  };

  return (
    <MainLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      navItems={navItems}
    >
      <div className="workspace">
        {renderActiveView()}
      </div>
    </MainLayout>
  );
}