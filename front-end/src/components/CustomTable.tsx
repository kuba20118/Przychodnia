import React from "react";
import { Table } from "react-bootstrap";

export type CustomTableHeaderT = string[];
export type CustomTableDataT = string[][];
export type CustomTablePropsT = {
  readonly header: CustomTableHeaderT;
  readonly data?: CustomTableDataT;
};

const CustomTable: React.FC<CustomTablePropsT> = ({ header, data }) => {
  return (
    <Table>
      <thead>
        <tr>
          {header.map((item, key) => {
            return <th key={key}>{item}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((item, key) => (
            <tr key={key}>
              {item.map((childItem, childKey) => {
                return <td key={childKey}>{childItem}</td>;
              })}
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default CustomTable;
