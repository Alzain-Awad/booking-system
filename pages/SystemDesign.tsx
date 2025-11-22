import React, { useState } from 'react';
import { ArchitectureDiagram } from '../components/ArchitectureDiagram';
import { DatabaseViewer } from '../components/DatabaseViewer';
import { DB_SCHEMA } from '../constants';
import { Layers, Database, Code2, Workflow } from 'lucide-react';

export const SystemDesign: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ARCH' | 'DB' | 'API' | 'FLOW'>('ARCH');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">System Architecture Design</h1>
          <p className="text-slate-500 mt-1">Technical blueprint for the AccessAutomate Pro platform.</p>
        </div>
      </div>

      {/* Tab Nav */}
      <div className="flex space-x-1 bg-white p-1 rounded-xl shadow-sm border border-slate-200 w-fit">
        {[
          { id: 'ARCH', label: 'Architecture', icon: Layers },
          { id: 'FLOW', label: 'User Flows', icon: Workflow },
          { id: 'DB', label: 'Database Schema', icon: Database },
          { id: 'API', label: 'API Strategy', icon: Code2 },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-brand-50 text-brand-600 shadow-sm ring-1 ring-brand-200'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <tab.icon size={16} className="mr-2" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 min-h-[600px]">
        {activeTab === 'ARCH' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-slate-800">High-Level Infrastructure</h2>
            <p className="text-slate-600 max-w-3xl">
              The system utilizes a microservice-ready approach. The Integration Service (Middleware) acts as the brain, 
              decoupling the user-facing application from hardware-specific logic (ZKTeco/TTLock). This ensures 
              that if a device goes offline, the web app remains responsive.
            </p>
            <ArchitectureDiagram />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="p-4 border border-l-4 border-slate-200 border-l-emerald-500 rounded bg-slate-50">
                    <h3 className="font-bold text-emerald-700">Automated Sync</h3>
                    <p className="text-sm mt-1 text-slate-600">Cron jobs run every minute to check for upcoming bookings and push credentials 15 mins prior to start time.</p>
                </div>
                <div className="p-4 border border-l-4 border-slate-200 border-l-blue-500 rounded bg-slate-50">
                    <h3 className="font-bold text-blue-700">Offline Resilience</h3>
                    <p className="text-sm mt-1 text-slate-600">Access Rules are cached on local gateways where possible. The system queues retry attempts for offline devices.</p>
                </div>
                <div className="p-4 border border-l-4 border-slate-200 border-l-amber-500 rounded bg-slate-50">
                    <h3 className="font-bold text-amber-700">Security First</h3>
                    <p className="text-sm mt-1 text-slate-600">All sensitive credential data (PINs, biometric hashes) is encrypted at rest using AES-256.</p>
                </div>
            </div>
          </div>
        )}

        {activeTab === 'FLOW' && (
          <div className="space-y-8">
             <div>
                <h2 className="text-lg font-semibold text-slate-800 mb-4">1. Access Creation Flow</h2>
                <div className="flex flex-col space-y-2 max-w-2xl">
                   <div className="flex items-center p-3 bg-slate-50 rounded border border-slate-200">
                      <span className="font-mono bg-slate-200 px-2 py-1 rounded text-xs mr-3">TRIGGER</span>
                      <span>User completes payment for <strong>Office 301</strong></span>
                   </div>
                   <div className="h-6 border-l-2 border-slate-300 ml-8"></div>
                   <div className="flex items-center p-3 bg-blue-50 rounded border border-blue-100 text-blue-900">
                      <span className="font-mono bg-blue-200 px-2 py-1 rounded text-xs mr-3">SYSTEM</span>
                      <span>Check device type for Office 301 -> <strong>TTLock</strong></span>
                   </div>
                   <div className="h-6 border-l-2 border-slate-300 ml-8"></div>
                   <div className="flex items-center p-3 bg-blue-50 rounded border border-blue-100 text-blue-900">
                      <span className="font-mono bg-blue-200 px-2 py-1 rounded text-xs mr-3">API</span>
                      <span>Call TTLock API: <code>createCustomPasscode(start, end)</code></span>
                   </div>
                   <div className="h-6 border-l-2 border-slate-300 ml-8"></div>
                   <div className="flex items-center p-3 bg-emerald-50 rounded border border-emerald-100 text-emerald-900">
                      <span className="font-mono bg-emerald-200 px-2 py-1 rounded text-xs mr-3">SUCCESS</span>
                      <span>Store PIN in DB & Email User</span>
                   </div>
                </div>
             </div>

             <div>
                <h2 className="text-lg font-semibold text-slate-800 mb-4">2. Automated Revocation Flow</h2>
                <div className="flex flex-col space-y-2 max-w-2xl">
                   <div className="flex items-center p-3 bg-slate-50 rounded border border-slate-200">
                      <span className="font-mono bg-slate-200 px-2 py-1 rounded text-xs mr-3">CRON</span>
                      <span>Check for bookings ending in &lt; 5 mins</span>
                   </div>
                   <div className="h-6 border-l-2 border-slate-300 ml-8"></div>
                   <div className="flex items-center p-3 bg-amber-50 rounded border border-amber-100 text-amber-900">
                      <span className="font-mono bg-amber-200 px-2 py-1 rounded text-xs mr-3">ACTION</span>
                      <span>Queue <code>RemoveAccess()</code> job</span>
                   </div>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'DB' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-slate-800">Entity Relationship Schema</h2>
            <p className="text-slate-600 mb-4">
               Key relationships: Users have many Bookings. Bookings have many AccessRules. AccessRules map 1:1 to Devices for a specific duration.
            </p>
            <DatabaseViewer schemas={DB_SCHEMA} />
          </div>
        )}

        {activeTab === 'API' && (
          <div className="space-y-6">
             <h2 className="text-lg font-semibold text-slate-800">Integration Strategy</h2>
             
             <div className="space-y-6">
                <div className="border rounded-lg overflow-hidden">
                    <div className="bg-slate-100 px-4 py-2 border-b font-mono text-sm font-bold text-slate-700">ZKTECO SDK Implementation</div>
                    <div className="p-4 bg-slate-900 text-slate-50 font-mono text-xs overflow-x-auto">
                        <p className="text-gray-400">// Pseudo-code for User Sync</p>
                        <p><span className="text-purple-400">async function</span> <span className="text-yellow-300">syncZKTecoUser</span>(user, deviceIP) {'{'}</p>
                        <p className="pl-4">  <span className="text-purple-400">const</span> zk = <span className="text-purple-400">new</span> ZKLib(deviceIP, 4370);</p>
                        <p className="pl-4">  <span className="text-purple-400">await</span> zk.createSocket();</p>
                        <p className="pl-4">  <span className="text-purple-400">await</span> zk.setUser({'{'}</p>
                        <p className="pl-8">    uid: user.dbId,</p>
                        <p className="pl-8">    userid: user.employeeId,</p>
                        <p className="pl-8">    name: user.fullName,</p>
                        <p className="pl-8">    cardno: user.rfidCard</p>
                        <p className="pl-4">  {'}'});</p>
                        <p className="pl-4">  <span className="text-gray-400">// Set Timezone/Group for access control</span></p>
                        <p className="pl-4">  <span className="text-purple-400">await</span> zk.setZone(user.employeeId, ACCESS_GROUP_1);</p>
                        <p className="pl-4">  <span className="text-purple-400">await</span> zk.disconnect();</p>
                        <p>{'}'}</p>
                    </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                    <div className="bg-slate-100 px-4 py-2 border-b font-mono text-sm font-bold text-slate-700">TTLock Cloud API</div>
                    <div className="p-4 bg-white text-slate-800 text-sm">
                        <p className="mb-2"><strong>Endpoint:</strong> <code className="bg-slate-100 px-1">POST /v3/keyboardPwd/add</code></p>
                        <p className="mb-2">Used to generate a temporary PIN code for the user.</p>
                        <div className="bg-slate-50 p-3 rounded border font-mono text-xs">
                            {`{
  "clientId": "YOUR_CLIENT_ID",
  "accessToken": "USER_ACCESS_TOKEN",
  "lockId": 12345,
  "keyboardPwdType": 3, // 3 = Period
  "startDate": 1698400000000,
  "endDate": 1698486400000,
  "addType": 1 // 1 = random, 2 = custom
}`}
                        </div>
                    </div>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};