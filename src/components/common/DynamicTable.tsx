import React from "react";

export interface Column<T> {
  key: string;
  label: string;
  align?: "left" | "right" | "center";
  render?: (row: T) => React.ReactNode;
}

interface DynamicTableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T) => string;
  emptyMessage?: string;
}

export function DynamicTable<T>({
  columns,
  data,
  rowKey,
  emptyMessage = "No hay registros",
}: DynamicTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">{emptyMessage}</div>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-${
                    col.align || "left"
                  }`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row) => (
              <tr key={rowKey(row)} className="hover:bg-gray-50">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-6 py-4 whitespace-nowrap text-${
                      col.align || "left"
                    }`}
                  >
                    {col.render ? col.render(row) : (row as any)[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
