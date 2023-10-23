// @/src/data/tableColumns.ts

import { styled } from "@stitches/react";
import { IColumnType } from "types/IColumnType";
import { IData } from "types/IData";

const tableColumns: IColumnType<IData>[] = [
  { key: "id", title: "Id", width: 30 },
  { key: "fullName", title: "Full Name", width: 200 },
  { key: "role", title: "Role", width: 200 },
  {
    key: "tags",
    title: "Tags",
    width: 200,
    render: (_, { tags }) => (
      <div style={{ display: "flex" }}>
        {tags.map((tag, tagIndex) => (
          <Tag key={`tag-${tagIndex}`}>{tag}</Tag>
        ))}
      </div>
    ),
  },
];

const Tag = styled("span", {
  background: "#334F6D",
  color: "white",
  padding: "5px 10px",
  borderRadius: "99999px",
  marginLeft:'3px',
});
export default tableColumns;
