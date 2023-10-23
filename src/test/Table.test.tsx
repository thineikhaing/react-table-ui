// inside App.test.tsx
// @ts-nocheck
import { render, screen } from '@testing-library/react';
import { Table } from "../../src/components/Table"

describe('Table component', () => {
   it('should render a table with a header and body', () => {
    const columns = [
        { key: "name", title: "Name" },
        { key: "age", title: "Age" },
      ];
      const data = [{ name: "John Doe", age: 30 }, { name: "Jane Doe", age: 25 }];
      render(<Table data={data} columns={columns} multiSelect={true}/>);
      
      const nameColumnHeader = screen.getByRole("columnheader", { name: "Name" });
      const cellName = screen.getByRole("cell", { name: "John Doe" });

      expect(nameColumnHeader).toBeInTheDocument();
      expect(cellName).toBeInTheDocument();

   });

   it("should render a header row for each column", () => {
    const columns = [
      { key: "name", title: "Name" },
      { key: "age", title: "Age" },
    ];
    const data = [{ name: "John Doe", age: 30 }, { name: "Jane Doe", age: 25 }];

    render(<Table data={data} columns={columns} multiSelect={true}/>);

    const headerRows = screen.getAllByRole("columnheader");

    expect(headerRows.length).toBe(3);
    expect(headerRows[0]).toHaveTextContent("Select");
    expect(headerRows[1]).toHaveTextContent("Name");
    expect(headerRows[2]).toHaveTextContent("Age");
  });

   it("should render a body row for each data item", () => {
    const columns = [
      { key: "name", title: "Name" },
      { key: "age", title: "Age" },
    ];
    const data = [{ name: "John Doe", age: 30 }, { name: "Jane Doe", age: 25 }];

    render(<Table data={data} columns={columns} multiSelect={true}/>);

    const bodyRows = screen.getAllByRole("row");

    expect(bodyRows.length).toBe(3);
    expect(bodyRows[0]).toHaveTextContent("SelectNameAge");
    expect(bodyRows[1]).toHaveTextContent("John Doe30");
    expect(bodyRows[2]).toHaveTextContent("Jane Doe25");
  });

  it("should sort the data by the selected column and order", () => {
    const columns = [
      { key: "name", title: "Name" },
      { key: "age", title: "Age" },
    ];
    const data = [{ name: "John Doe", age: 35 }, { name: "Jane Doe", age: 25 }];

    render(<Table data={data} columns={columns} multiSelect={true}/>);

    const ageHeader = screen.getByText("Age");
    ageHeader.click();
  
    const bodyRows = screen.getAllByRole("row");
    expect(bodyRows[1]).toHaveTextContent("John Doe35");
    expect(bodyRows[2]).toHaveTextContent("Jane Doe25");
    ageHeader.click();

  });

  it("should allow multiple items to be selected if `multiSelect` is true", () => {
    const columns = [
      { key: "name", title: "Name" },
      { key: "age", title: "Age" },
    ];
    const data = [{ name: "John Doe", age: 30 }, { name: "Jane Doe", age: 25 }];

    render(<Table data={data} columns={columns} multiSelect={true} />);

    const selectCheckboxes = screen.getAllByRole("checkbox", { checked: false });

    selectCheckboxes.forEach((checkbox) => {
        checkbox.checked = true;
      });

    selectCheckboxes.forEach((checkbox) => {
    expect(checkbox).toBeChecked();
    });
  });

});
