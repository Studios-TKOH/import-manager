import React from "react";
import { Package, Search, Bell } from "lucide-react";
import { NavItem } from "../types";

interface MainLayoutProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  navItems: NavItem[];
  children: React.ReactNode;
}

export function MainLayout({
  activeTab,
  setActiveTab,
  navItems,
  children,
}: MainLayoutProps) {
  return (
    <div className="layout-container">
      {/* SIDEBAR (Barra Lateral) */}
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

      {/* MAIN CONTENT (Contenido Principal) */}
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

        {/* AQUÍ SE INYECTA LA VISTA ACTIVA (EJ: El Dashboard) */}
        {children}
      </main>
    </div>
  );
}
