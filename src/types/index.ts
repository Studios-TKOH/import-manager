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

export interface TableRowProps {
    fecha: string;
    doc: string;
    entidad: string;
    tipo: string;
    monto: string;
}