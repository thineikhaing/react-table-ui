// @/src/components/TableHeader.tsx
import { styled } from "@stitches/react";
import { IColumnType } from "../../types/IColumnType";

interface Props<T> {
  columns: IColumnType<T>[];
  onSort: (column: IColumnType<T>) => void;
  sortColumn: IColumnType<T> | null;
  sortOrder: 'asc' | 'desc' | null;
}

const TableHeaderCell = styled("th", {
  backgroundColor: "#f1f1f1",
  position: "relative", 
  padding: 12,
  fontWeight: 500,
  textAlign: "left",
  fontSize: 14,
  color: "#2c3e50",
  borderBottom: "2px solid #ccc",
  "&:first-child": {
    borderTopLeftRadius: 12,
  },
  "&:last-child": {
    borderTopRightRadius: 12,
  },
  "&:hover": {
    cursor: "pointer",
    textDecoration: "underline",
  },
});




export function TableHeader<T>({ columns, onSort, sortColumn, sortOrder }: Props<T>): JSX.Element {
    return (
      <tr> 
        {columns.map((column, columnIndex) => (
          <TableHeaderCell
            key={`table-head-cell-${columnIndex}`}
            style={{ width: column.width, backgroundColor: column.color }}
            onClick={() => onSort(column)}
            title={sortColumn === column ? (sortOrder === "asc" ? "Click to order descending" : "Click to order ascending") : "Click to order"}
          >
            {column.title}
            {sortColumn === column && sortOrder && (
              <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
            )}
          </TableHeaderCell>
        ))}
      </tr>
    );
  }
