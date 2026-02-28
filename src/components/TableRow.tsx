import { TableRowProps } from "../types";

export function TableRow({ fecha, doc, entidad, tipo, monto }: TableRowProps) {
  const isVenta = tipo === "Venta";

  return (
    <tr className="table-row">
      <td className="table-cell">{fecha}</td>
      <td className="table-cell-bold">{doc}</td>
      <td className="table-cell">{entidad}</td>
      <td className="py-4">
        <span className={`badge ${isVenta ? "badge-venta" : "badge-compra"}`}>
          {tipo}
        </span>
      </td>
      <td className="table-cell-right">{monto}</td>
    </tr>
  );
}
