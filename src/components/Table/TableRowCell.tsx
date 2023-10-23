// @/src/components/TableRowCell.tsx
import { styled } from "@stitches/react";
import get from "lodash.get";
import { IColumnType } from "types/IColumnType";

interface Props<T> {
  item: T;
  column: IColumnType<T>;
  selected: boolean;
  onSelectionChange: () => void;
}

const TableCell = styled("td", {
  padding: 12,
  fontSize: 14,
  color: "#333333",
});

const Input = styled("input", {
    width: 32,
  });

export function TableRowCell<T>({ item, column, selected, onSelectionChange }: Props<T>): JSX.Element {
    const value = get(item, column.key);
    const checked = selected !== undefined ? selected : false;
   
    const renderSelectionInput = () => {
        if (column.selectionType === 'single') {
          return (
            <Input
              type="radio"
              name="singleSelect"
              checked={checked}
              onChange={onSelectionChange}
            />
          );
        } else if (column.selectionType === 'multi') {
          return (
            <Input
              type="checkbox"
              checked={checked}
              onChange={onSelectionChange}
            />
          );
        }
      };

    return (
      <TableCell>
        {column.selectionType ? (
        renderSelectionInput()
      ) : (
          // Render regular data cell for other columns
          column.render ? column.render(column, item) : value
        )}
      </TableCell>
    );
  }