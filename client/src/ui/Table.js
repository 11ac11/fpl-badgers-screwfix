import React from 'react';
import { useTable, useSortBy } from 'react-table';

const Table = ({
  columns,
  data,
  tableClassName,
  theadClassName,
  thClassName,
  tbodyClassName,
  trClassName,
  tdClassName,
}) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  return (
    <table {...getTableProps()} className={`table ${tableClassName}`}>
      <thead>
        {headerGroups.map((headerGroup, index) => (
          <tr key={index} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th key={`${column.id}${index}`}
                onClick={
                  column.sortable
                    ? column.getHeaderProps(column.getSortByToggleProps())
                        .onClick
                    : null
                }
                style={{
                  minWidth: column.minWidth,
                  width: column.width,
                  fontSize: column.fontSize || 'inherit',
                }}
                className={`th ${thClassName}`}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span>{column.render('Header')}</span>
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' ▼' : ' ▲') : ''}
                  </span>
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()} className={`tbody ${tbodyClassName}`}>
        {rows.map((row, index) => {
          prepareRow(row);
          return (
            //console.log(row),
            <tr key={index} {...row.getRowProps()} className={`tr ${trClassName}`}>
              {row.cells.map((cell) => {
                console.log(cell)
                return (
                  <td
                    {...cell.getCellProps({
                      style: {
                        fontSize: cell.fontSize,
                        textAlign: cell.column.Header.includes('points')
                          ? 'center'
                          : 'left',
                      },
                    })}
                    className={`td ${tdClassName} ${cell.column.id.includes('points') && 'fixture-score'}`}
                  >
                    {cell.column.id === 'index'
                      ? row.index + 1
                      : cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default React.memo(Table);
