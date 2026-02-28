import { useState } from 'react';
import { Home, ShoppingCart, Package, Users, Settings, Mail, TrendingUp } from 'lucide-react';
import { NavItem } from '../types';

export const useAppLogic = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    const navItems: NavItem[] = [
        { id: 'dashboard', label: 'Inicio', icon: Home },
        { id: 'ventas', label: 'Ventas', icon: TrendingUp },
        { id: 'compras', label: 'Compras', icon: ShoppingCart },
        { id: 'inventario', label: 'Inventario', icon: Package },
        { id: 'contactos', label: 'Clientes / Prov.', icon: Users },
        { id: 'automatizacion', label: 'Buzón Correo', icon: Mail },
        { id: 'configuracion', label: 'Ajustes', icon: Settings },
    ];

    return {
        activeTab,
        setActiveTab,
        navItems
    };
};