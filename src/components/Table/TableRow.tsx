// @/src/components/TableRow.tsx
// @ts-nocheck
import { styled } from "@stitches/react";
import { IColumnType } from "types/IColumnType";
import { TableRowCell } from "./TableRowCell";
import get from "lodash.get";
interface Props<T> {
  data: T[];
  columns: IColumnType<T>[];
  selectedItems: Record<string, boolean>;
  onSelectionChange: (item: T) => void;
}

const TableRowItem = styled("tr", {
  cursor: "auto",
  "&:nth-child(odd)": {
    backgroundColor: "#f9f9f9",
  },
  "&:last-child": {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
});

export function TableRow<T>({ data, columns, selectedItems, onSelectionChange }: Props<T>): JSX.Element {
  return (
    <>
      {data.map((item, itemIndex) => (
        <TableRowItem key={`table-body-${itemIndex}`}>
          {columns.map((column, columnIndex) => (
            <TableRowCell
              key={`table-row-cell-${columnIndex}`}
              item={item}
              column={column}
              selected={selectedItems[get(item, 'id')]} // Check if the item is selected
              onSelectionChange={() => onSelectionChange(item)} // Handle selection change
            />
          ))}
        </TableRowItem>
      ))}
    </>
  );
}
