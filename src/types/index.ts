import { ElementType } from 'react';

export interface NavItem {
    id: string;
    label: string;
    icon: ElementType;
}

export interface StatCardProps {
    title: string;
    value: string;
    icon: ElementType;
    color: string;
    bg: string;
}

export interface Transaccion {
    id: string;
    fecha: string;
    documento: string;
    entidad: string;
    producto: string;
    precio_unitario: number;
    moneda: string;
    cantidad: number;
    unidad: string;
    total: number;
    tipo: 'Venta' | 'Compra';
}

export interface TableRowProps {
    transaccion: Transaccion;
}

export interface Producto {
    id: string;
    codigo: string;
    descripcion: string;
    stock: number;
    precio: number;
}

export interface Contacto {
    id: string;
    nombre: string;
    tipo: 'Cliente' | 'Proveedor';
    ruc: string;
}

export interface Correo {
    id: string;
    fecha: string;
    asunto: string;
    remitente: string;
    procesado: boolean;
}