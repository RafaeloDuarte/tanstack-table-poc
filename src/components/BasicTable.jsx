import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo } from "react";
import mData from '../MOCK_DATA.json'

function BasicTable() {

    const data = useMemo(() => mData, [])

    const columns = [
        {
            header: 'ID',
            accessorKey: 'id',
            footer: 'id'
        },
        {
            header: 'First name',
            accessorKey: 'first_name',
            footer: 'First name'
        },
        {
            header: 'Last name',
            accessorKey: 'last_name',
            footer: 'Last name'
        }
    ]

    const [columnOrder, setColumnOrder] = columns.map(column => column.id)

    const table = useReactTable({
        data,
        columns,
        state: {
            columnOrder,
        },
        onColumnOrderChange: setColumnOrder,
        getCoreRowModel: getCoreRowModel(),
        debugTable: true,
        debugHeaders: true,
        debugColumns: true,
    })

    return (
        <div>
            <table>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </th>
                            )
                            )}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell =>
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>)
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
}

export default BasicTable;
