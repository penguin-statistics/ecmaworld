import mdiArrowDown from '@iconify/icons-mdi/arrow-down'
import mdiArrowUp from '@iconify/icons-mdi/arrow-up'
import { Icon } from '@iconify/react'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from '@mui/material'

import clsx from 'clsx'
import { useMemo } from 'react'
import {
  Column,
  useAbsoluteLayout,
  useBlockLayout,
  useFilters,
  useFlexLayout,
  useGridLayout,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table'

import { IconNumber } from 'components/foundational/IconNumber'

import styles from './index.module.css'

export function DataTable<T extends { id: string }>({
  columns,
  data,
}: {
  columns: Column<T>[]
  data: T[]
}) {
  // const deferredData = useDeferredValue(data)
  const modifiedColumns = useMemo(
    () =>
      columns.map((c) => ({
        ...c,
        sortType: 'basic',
        sortDescFirst: true,
      })),
    [columns],
  )

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize, sortBy },
    prepareRow,
  } = useTable<T>(
    {
      columns: modifiedColumns,
      data,
      initialState: {
        pageSize: 20,
        sortBy: [{ id: 'percentage', desc: true }],
      },
    },
    useFilters,
    useSortBy,
    usePagination,
  )

  // const deferredRows = useDeferredValue(rows)

  // Render the UI for your table
  return (
    <Table stickyHeader className={styles.root} {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow className="max-h-12" {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Tooltip
                {...(!column.headerTooltip ? { open: false } : {})}
                arrow
                placement="bottom-start"
                title={column.headerTooltip}
              >
                <TableCell
                  variant="head"
                  size="small"
                  className={styles.head}
                  width={column.width}
                  sx={{
                    padding: 0,
                  }}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  <div
                    className={clsx(
                      styles.headInner,
                      column.canSort && styles.sortable,
                    )}
                  >
                    <span className="opacity-80 font-bold">
                      {column.render('Header')}{' '}
                    </span>
                    <span className="inline-flex items-center">
                      <Icon
                        fontSize="1.1rem"
                        className={clsx(
                          'transition ml-3',
                          column.isSortedDesc ? 'rotate-180' : '',
                          column.isSorted ? 'opacity-100' : 'opacity-0',
                        )}
                        icon={mdiArrowUp}
                      />
                      {sortBy.length > 1 && column.isSorted && (
                        <IconNumber
                          fontSize="1.2rem"
                          className="opacity-70"
                          value={column.sortedIndex + 1}
                        />
                      )}
                    </span>
                  </div>
                </TableCell>
              </Tooltip>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps()}>
        {page.map((row) => {
          prepareRow(row)
          return (
            <TableRow
              className={styles.row}
              {...row.getRowProps()}
              key={row.original.id}
            >
              {row.cells.map((cell) => {
                return (
                  <TableCell
                    size="small"
                    variant="body"
                    {...cell.getCellProps()}
                  >
                    {cell.render('Cell')}
                  </TableCell>
                )
              })}
            </TableRow>
          )
        })}
        {page.length === 0 && (
          <TableRow className={styles.row}>
            <TableCell colSpan={columns.length}>
              <div className="flex items-center justify-center">
                <p className="text-center">No data</p>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            count={data.length}
            page={pageIndex}
            showFirstButton
            showLastButton
            rowsPerPage={pageSize}
            rowsPerPageOptions={[10, 20, 50, { label: 'All', value: -1 }]}
            onPageChange={(_, page) => {
              gotoPage(page)
            }}
            onRowsPerPageChange={(e) => {
              setPageSize(parseInt(e.target.value, 10))
            }}
          />
        </TableRow>
      </TableFooter>
    </Table>
  )
}
