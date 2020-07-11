import React, {useState} from "react";
import { useTable, useFilters, useSortBy } from "react-table";


import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

export default function Table({ columns, data }) {
  const [filterInput, setFilterInput] = useState("");


  const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      setFilter
    } = useTable(
      {
        columns,
        data
      },
      useFilters,
      useSortBy // This plugin Hook will help to sort our table columns
    );


    const handleFilterChange = e => {
      const value = e.target.value || undefined;
      setFilter("name", value); // Update the name filter. Now our table will filter and show only the rows which have a matching value
      setFilterInput(value);
    };
    return(


      <>
        <input
          value={filterInput}
          onChange={handleFilterChange}
          placeholder={"Buscar Nombre"}
        />

        <MaUTable {...getTableProps()}>
          <TableHead>
            {headerGroups.map(headerGroup => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={
                      column.isSorted
                        ? column.isSortedDesc
                          ? "sort-desc"
                          : "sort-asc"
                        : ""
                    }
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <TableCell {...cell.getCellProps()}>{cell.render("Cell")}</TableCell>;
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </MaUTable>
      </>
    )
}