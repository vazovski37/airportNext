import React from "react";

export interface ITableColumn {
  label: string;
  accessor: string;
  render?: (row: any) => React.ReactNode;
}

export interface ITableProps {
  data: any[];
  columns: ITableColumn[];
  isLoading?: boolean;
  emptyMessage?: string;
}

const STable: React.FC<ITableProps> = ({ data, columns, isLoading, emptyMessage = "No data available." }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : data.length === 0 ? (
        <p className="text-center text-gray-500">{emptyMessage}</p>
      ) : (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              {columns.map((column) => (
                <th key={column.accessor} className="border border-gray-300 p-2">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t">
                {columns.map((column) => (
                  <td key={column.accessor} className="border border-gray-300 p-2">
                    {column.render ? column.render(row) : row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default STable;
