import React, { useState } from 'react';
import { Check, X, MoreHorizontal } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel } from '@tanstack/react-table';

const ApplicationsTable = ({ data, onApprove, onReject }) => {
  const [sorting, setSorting] = useState([]);
  const { hasPermission } = useAuthStore();

  const columns = [
    {
      accessorKey: 'studentName',
      header: 'Student Name',
      cell: info => <div className="font-medium">{info.getValue()}</div>,
    },
    {
      accessorKey: 'studentId',
      header: 'Student ID',
    },
    {
      accessorKey: 'course',
      header: 'Course',
    },
    {
      accessorKey: 'applicationDate',
      header: 'Date',
      cell: info => new Date(info.getValue()).toLocaleDateString(),
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: info => (
        <span className={`capitalize ${info.getValue() === 'vacate' ? 'text-orange-600' : 'text-blue-600'}`}>
          {info.getValue()}
        </span>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: info => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
          ${info.getValue() === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            info.getValue() === 'approved' ? 'bg-green-100 text-green-800' :
            'bg-red-100 text-red-800'}`}>
          {info.getValue()}
        </span>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: props => (
        hasPermission('applications', 'update') && props.row.original.status === 'pending' ? (
          <div className="flex space-x-2">
            <button
              onClick={() => onApprove(props.row.original.id)}
              className="p-1 text-green-600 hover:bg-green-50 rounded"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={() => onReject(props.row.original.id)}
              className="p-1 text-red-600 hover:bg-red-50 rounded"
            >
              <X className="w-4 h-4" />
            </button>
            <button className="p-1 text-gray-600 hover:bg-gray-50 rounded">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        ) : null
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="mt-4 bg-white rounded-lg shadow">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header.isPlaceholder
                      ? null
                      : header.column.columnDef.header}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {cell.column.columnDef.cell
                      ? cell.column.columnDef.cell(cell)
                      : cell.getValue()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationsTable;
