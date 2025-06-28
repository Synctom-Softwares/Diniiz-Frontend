
import { Pencil, Trash2 } from 'lucide-react';

const GenericTable = ({ columns = [], data = [] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 bg-white text-sm text-left">
        <thead className="bg-gray-50 text-gray-700">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 border-b font-semibold">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center p-4 text-gray-500">
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-2">
                    {col.type === 'action' ? (
                      <div className="flex items-center gap-3">
                        {col.actions?.includes('edit') && (
                          <button className="text-blue-600 hover:underline">
                            <Pencil size={16} />
                          </button>
                        )}
                        {col.actions?.includes('delete') && (
                          <button className="text-red-600 hover:underline">
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    ) : (
                      row[col.key]
                    )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GenericTable;
