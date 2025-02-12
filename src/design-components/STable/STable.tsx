import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faExclamationCircle } from "@fortawesome/free-solid-svg-icons"; // Free icons

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

const STable: React.FC<ITableProps> = ({
  data,
  columns,
  isLoading,
  emptyMessage = "No data available.",
}) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      {isLoading ? (
        <div className="flex justify-center items-center text-gray-500">
          <FontAwesomeIcon icon={faSpinner} spin className="mr-2 h-5 w-5" />
          <p>Loading...</p>
        </div>
      ) : data.length === 0 ? (
        <div className="flex justify-center items-center text-gray-500">
          <FontAwesomeIcon icon={faExclamationCircle} className="mr-2 h-5 w-5" />
          <p>{emptyMessage}</p>
        </div>
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
