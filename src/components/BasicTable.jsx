import { useReactTable, flexRender, getCoreRowModel } from "@tanstack/react-table";
import { useDrag, useDrop } from 'react-dnd'
import { useMemo, useState } from "react";
import mData from '../MOCK_DATA.json'

const reorderColumn = (draggedColumnId, targetColumnId, columnOrder) => {
    columnOrder.splice(
        columnOrder.indexOf(targetColumnId),
        0,
        columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0]
    )
    return [...columnOrder]
}


const DraggableColumnHeader = ({ header, table }) => {
    const { getState, setColumnOrder } = table
    const { columnOrder } = getState()

    const [, dropRef] = useDrop({
        accept: 'column',
        drop: (draggedColumn) => {
            const newColumnOrder = reorderColumn(
                draggedColumn.id,
                header.id,
                columnOrder
            )
            setColumnOrder(newColumnOrder)
        },
    })

    const [{ isDragging }, dragRef, previewRef] = useDrag({
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
        item: () => header,
        type: 'column',
    })

    return (
        <th
            ref={dropRef}
            colSpan={header.colSpan}
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            <div ref={previewRef}>
                {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                <button ref={dragRef}>🟰</button>
            </div>
        </th>
    )
}


function BasicTable() {

    const data = useMemo(() => mData, [])

    const columns = [
        {
            id: '1',
            header: 'ID',
            accessorKey: 'id',
            footer: 'id'
        },
        {
            id: '2',
            header: 'First name',
            accessorKey: 'first_name',
            footer: 'First name'
        },
        {
            id: '3',
            header: 'Last name',
            accessorKey: 'last_name',
            footer: 'Last name'
        }
    ]

    const [columnOrder, setColumnOrder] = useState(columns.map(column => column.id))
 
    const table = useReactTable({
        data,
        columns,
        state: {
            columnOrder,
        },
        onColumnOrderChange: setColumnOrder,
        getCoreRowModel: getCoreRowModel(),
        setColumnOrder: (n) => setColumnOrder(n),
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
                            {headerGroup.headers.map(header =>
                                <DraggableColumnHeader
                                    key={header.id}
                                    header={header}
                                    table={table}
                                />
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
