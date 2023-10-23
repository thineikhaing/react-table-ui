// @/src/App.tsx
import { useState } from "react";
import "@fontsource/anek-telugu";
import "./App.css";
import { Table } from "./components/Table/Table";
import data from "./data/tableData";
import tableColumns from "./data/tableColumns";
const App = () => {
  const [isMultiSelect, setIsMultiSelect] = useState(true);
  const handleMultiSelectChange = () => {
    setIsMultiSelect(!isMultiSelect);
  };
  return (
    <>
      <div className="container">
        <Table data={data} columns={tableColumns} multiSelect={isMultiSelect} data-testid="table"  />
      </div>
      <div className="control_option">
        <label>
          Multi-Select
          <input
            type="checkbox"
            checked={isMultiSelect}
            onChange={handleMultiSelectChange}
          />
        </label>
      </div>
    </>
  );
};
export default App;
