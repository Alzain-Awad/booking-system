import React, { useState } from 'react';
import { MOCK_DEVICES, MOCK_LOGS } from '../constants';
import { DeviceType } from '../types';
import { Activity, ShieldAlert, Wifi, WifiOff, Battery, RefreshCw, Bot } from 'lucide-react';
import { analyzeSystemHealth } from '../services/geminiService';

export const Dashboard: React.FC = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [aiInsight, setAiInsight] = useState<string | null>(null);

  const handleAiAnalysis = async () => {
    setAnalyzing(true);
    const result = await analyzeSystemHealth(MOCK_LOGS);
    setAiInsight(result);
    setAnalyzing(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Operations Center</h1>
          <p className="text-slate-500 mt-1">Real-time device status and access logs.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 text-slate-700">
          <RefreshCw size={16} />
          Sync All Devices
        </button>
      </div>

      {/* Device Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {MOCK_DEVICES.map((device) => (
          <div key={device.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-1 h-full ${device.status === 'ONLINE' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
            <div className="flex justify-between items-start mb-3">
              <div className={`p-2 rounded-lg ${device.type === DeviceType.ZKTECO ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                {device.type === DeviceType.ZKTECO ? 'ZKT' : 'TTL'}
              </div>
              {device.status === 'ONLINE' ? <Wifi size={16} className="text-emerald-500" /> : <WifiOff size={16} className="text-red-500" />}
            </div>
            <h3 className="font-bold text-slate-800 truncate">{device.name}</h3>
            <p className="text-xs text-slate-500 mb-4">{device.location}</p>
            
            <div className="flex justify-between items-center pt-3 border-t border-slate-100">
              <span className="text-[10px] text-slate-400">Sync: {device.lastSync}</span>
              {device.batteryLevel !== undefined && (
                 <div className="flex items-center gap-1 text-[10px] text-slate-600">
                   <Battery size={10} /> {device.batteryLevel}%
                 </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Logs & AI */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Logs Section */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
            <h2 className="font-bold text-slate-800 flex items-center gap-2">
              <Activity size={18} className="text-slate-400" />
              Recent Access Logs
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-6 py-3">Time</th>
                  <th className="px-6 py-3">User</th>
                  <th className="px-6 py-3">Device</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_LOGS.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50">
                    <td className="px-6 py-3 font-mono text-slate-600 text-xs">
                      {log.timestamp.split('T')[1].substring(0, 5)}
                    </td>
                    <td className="px-6 py-3 font-medium text-slate-900">{log.userName}</td>
                    <td className="px-6 py-3 text-slate-500">{log.device}</td>
                    <td className="px-6 py-3">
                       <span className={`px-2 py-1 rounded text-xs font-medium ${
                         log.action === 'ENTRY_GRANTED' ? 'bg-emerald-50 text-emerald-700' :
                         log.action === 'ENTRY_DENIED' ? 'bg-red-50 text-red-700' :
                         'bg-amber-50 text-amber-700'
                       }`}>
                         {log.action.replace('_', ' ')}
                       </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Assistant Section */}
        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-500/20 rounded-lg border border-indigo-500/30">
              <Bot size={24} className="text-indigo-300" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Gemini Guardian</h3>
              <p className="text-indigo-200 text-xs">AI System Analysis</p>
            </div>
          </div>
          
          <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
            Analyze recent access patterns, device failures, and potential security anomalies using Google Gemini 2.5 Flash.
          </p>

          {aiInsight ? (
            <div className="bg-indigo-800/50 border border-indigo-700 rounded-lg p-4 mb-4 animate-pulse-once">
              <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-2">Analysis Report</h4>
              <p className="text-sm text-white font-mono leading-relaxed">{aiInsight}</p>
            </div>
          ) : null}

          <button 
            onClick={handleAiAnalysis}
            disabled={analyzing}
            className="w-full py-3 bg-indigo-500 hover:bg-indigo-400 disabled:bg-indigo-800 disabled:text-indigo-400 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            {analyzing ? (
              <>
                <RefreshCw className="animate-spin" size={16} /> Analyzing...
              </>
            ) : (
              <>
                <ShieldAlert size={16} /> Run Health Check
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};