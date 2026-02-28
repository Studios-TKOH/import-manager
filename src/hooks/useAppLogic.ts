import { useState, useMemo } from 'react';
import { Home, ShoppingCart, Package, Users, Settings, Mail, TrendingUp } from 'lucide-react';
import { NavItem, Transaccion } from '../types';

// Importamos la data simulada (Más adelante esto se leerá con Tauri FS)
import ventasData from '../data/ventas.json';
import comprasData from '../data/compras.json';

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

    const transacciones = useMemo(() => {
        const ventas: Transaccion[] = ventasData.map(v => ({
            ...v,
            entidad: v.cliente,
            tipo: 'Venta'
        }));

        const compras: Transaccion[] = comprasData.map(c => ({
            ...c,
            entidad: c.proveedor,
            tipo: 'Compra'
        }));

        const combinadas = [...ventas, ...compras];
        return combinadas.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
    }, []);

    const totalVentas = useMemo(() => {
        return transacciones
            .filter(t => t.tipo === 'Venta' && t.moneda === 'SOLES')
            .reduce((acc, curr) => acc + curr.total, 0);
    }, [transacciones]);

    const totalCompras = useMemo(() => {
        return transacciones
            .filter(t => t.tipo === 'Compra' && t.moneda === 'SOLES')
            .reduce((acc, curr) => acc + curr.total, 0);
    }, [transacciones]);

    const ultimasTransacciones = transacciones.slice(0, 5);

    const formatSoles = (monto: number) => {
        return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(monto);
    };

    return {
        activeTab,
        setActiveTab,
        navItems,
        ultimasTransacciones,
        totalVentas: formatSoles(totalVentas),
        totalCompras: formatSoles(totalCompras),
        formatSoles
    };
};
