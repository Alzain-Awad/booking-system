import React from 'react';
import { TableSchema } from '../types';
import { Key, Link } from 'lucide-react';

interface Props {
  schemas: TableSchema[];
}

export const DatabaseViewer: React.FC<Props> = ({ schemas }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {schemas.map((table) => (
        <div key={table.name} className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
          <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-slate-800 font-mono">{table.name}</h3>
              <p className="text-xs text-slate-500">{table.description}</p>
            </div>
          </div>
          <div className="p-0">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-medium">
                <tr>
                  <th className="px-4 py-2 w-8">Key</th>
                  <th className="px-4 py-2">Column</th>
                  <th className="px-4 py-2">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {table.columns.map((col) => (
                  <tr key={col.name} className="hover:bg-slate-50">
                    <td className="px-4 py-2 text-center">
                      {col.pk && <Key size={14} className="text-amber-500 mx-auto" />}
                      {col.fk && <Link size={14} className="text-blue-500 mx-auto" />}
                    </td>
                    <td className="px-4 py-2 font-mono text-slate-700">
                      {col.name}
                      {col.fk && <span className="ml-2 text-[10px] text-blue-500 bg-blue-50 px-1 rounded border border-blue-100">FK: {col.fk}</span>}
                    </td>
                    <td className="px-4 py-2 text-slate-500">
                      {col.type}
                      {col.note && <span className="block text-[10px] text-slate-400 italic">{col.note}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};