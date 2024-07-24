import { useTable, useSortBy, useFilters } from "react-table";
import { useMemo } from "react";

const DataTable = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        initialState: { sortBy: [{ id: "name", desc: false }] },
      },
      useFilters,
      useSortBy
    );

  return (
    <table {...getTableProps()} className="table-auto w-full border-collapse">
      <thead className="bg-gray-200">
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                className="px-4 py-2 border text-left cursor-pointer"
              >
                {column.render("Header")}
                <span className="ml-1">
                  {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} className="border-t">
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()} className="px-4 py-2 border">
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DataTable;
