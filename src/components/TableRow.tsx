import { TableRowProps } from "../types";

export function TableRow({ transaccion }: TableRowProps) {
  const isVenta = transaccion.tipo === "Venta";

  const formatMonto = (monto: number, moneda: string) => {
    const symbol = moneda === "DOLARES" ? "$" : "S/.";
    return `${symbol} ${monto.toFixed(2)}`;
  };

  return (
    <tr className="table-row">
      <td className="table-cell">{transaccion.fecha}</td>
      <td className="table-cell-bold">{transaccion.documento}</td>
      <td className="table-cell">{transaccion.entidad}</td>
      <td className="py-4">
        <span className={`badge ${isVenta ? "badge-venta" : "badge-compra"}`}>
          {transaccion.tipo}
        </span>
      </td>
      <td className="table-cell-right">
        {formatMonto(transaccion.total, transaccion.moneda)}
      </td>
    </tr>
  );
}
