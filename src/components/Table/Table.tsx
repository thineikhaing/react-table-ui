// @/src/components/Table.tsx
// @ts-nocheck
import { styled } from "@stitches/react";
import { useState } from "react";

import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import get from "lodash.get";
import { IColumnType } from "../types/IColumnType";

interface Props<T> {
  data: T[];
  columns: IColumnType<T>[];
  multiSelect: boolean;
}

const TableWrapper = styled("table", {
  borderCollapse: "collapse",
  border: "none",
  fontFamily: "Anek Telugu",
});

const Thead = styled("thead", {
  cursor: "pointer",
  position: "relative", 
});


export function Table<T>({ data, columns, multiSelect }: Props<T>): JSX.Element {

  
    const initialSortColumn: IColumnType<T> ={key: 'id',title: 'Id'};
    const initialSortOrder: 'asc' | 'desc' = 'asc'/* Set your initial sortOrder value here */;

    const initialSelectedItems: Record<string, boolean> = data.reduce((acc, item) => {
      acc[String(get(item, 'id'))] = false as boolean;
      return acc;
    }, {});
    
    const [sortColumn, setSortColumn] = useState<IColumnType<T>>(initialSortColumn);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(initialSortOrder);
    const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>(initialSelectedItems);


  const handleSort = (column: IColumnType<T>) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc"); 
    }
  };

  const handleSelectionChange = (item: T) => {
    if (multiSelect) {
      const itemId = String(get(item, 'id'));
      setSelectedItems({ ...selectedItems, [itemId]: !selectedItems[itemId] });
    } else {
      const newSelection: Record<string, boolean> = { [String(get(item, 'id'))]: true };
      setSelectedItems(newSelection);
    }
  };

  // Sort the data based on the selected column and order
  const sortedData = [...data];
  if (sortColumn) {
    sortedData.sort((a, b) => {
      const valueA = get(a, sortColumn.key);
      const valueB = get(b, sortColumn.key);

      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
      } else {
        const stringA = String(valueA).toLowerCase();
        const stringB = String(valueB).toLowerCase();
        return sortOrder === "asc" ? stringA.localeCompare(stringB) : stringB.localeCompare(stringA);
      }
    });
  }

  const selectionType = multiSelect ? 'multi' : 'single';
  const multiSelectColumn: IColumnType<any> = {
    key: 'select',
    title: 'Select',
    width: 50,
    color: "lightgray",
    selectionType: selectionType,
  };

  const updateColumns = [multiSelectColumn, ...columns] 

  return (
    <>
    <TableWrapper>
      <Thead>
        <TableHeader columns={updateColumns}  onSort={handleSort} sortColumn={sortColumn} sortOrder={sortOrder}/>
      </Thead>
      <tbody>
        <TableRow 
          data={sortedData} 
          columns={updateColumns} 
          selectedItems={selectedItems}
          onSelectionChange={handleSelectionChange}
          
          />
      </tbody>
    </TableWrapper>
    </>
  );
}

