import React from 'react';
import { ArrowRight, Database, Server, Smartphone, Lock, Globe, Cpu } from 'lucide-react';

const Node = ({ icon: Icon, title, sub, color = "blue" }: { icon: any, title: string, sub?: string, color?: string }) => (
  <div className={`flex flex-col items-center p-4 bg-white rounded-xl shadow-md border-b-4 border-${color}-500 w-48 z-10`}>
    <div className={`p-3 rounded-full bg-${color}-100 mb-3 text-${color}-600`}>
      <Icon size={24} />
    </div>
    <h3 className="font-bold text-slate-800 text-sm">{title}</h3>
    {sub && <p className="text-xs text-slate-500 text-center mt-1">{sub}</p>}
  </div>
);

const Connection = ({ label }: { label?: string }) => (
  <div className="flex-1 flex flex-col items-center justify-center px-2 relative">
    {label && <span className="absolute -top-3 text-[10px] font-mono text-slate-400 bg-slate-50 px-1">{label}</span>}
    <div className="h-0.5 w-full bg-slate-300 relative">
      <ArrowRight size={12} className="absolute -right-1 -top-[5px] text-slate-300" />
    </div>
  </div>
);

export const ArchitectureDiagram: React.FC = () => {
  return (
    <div className="w-full overflow-x-auto py-8 px-4 bg-slate-50 rounded-xl border border-slate-200">
      <div className="min-w-[800px] flex flex-col gap-12">
        
        {/* Layer 1: Clients */}
        <div className="flex justify-center gap-16">
          <Node icon={Smartphone} title="Mobile App" sub="iOS / Android" color="indigo" />
          <Node icon={Globe} title="Web Portal" sub="React Frontend" color="indigo" />
        </div>

        {/* Connector Down */}
        <div className="flex justify-center h-8 relative">
          <div className="absolute h-full w-0.5 bg-slate-300 left-1/2 -translate-x-1/2"></div>
        </div>

        {/* Layer 2: Backend & Integration */}
        <div className="flex justify-center items-center gap-4">
          <Node icon={Server} title="API Gateway" sub="Load Balancer" color="emerald" />
          <Connection label="REST/Auth" />
          <Node icon={Cpu} title="Integration Service" sub="Access Sync Worker" color="amber" />
        </div>

        {/* Connector Down */}
        <div className="flex justify-center h-8 relative">
           <div className="absolute h-full w-0.5 bg-slate-300 left-1/2 -translate-x-1/2"></div>
           {/* Split */}
           <div className="absolute bottom-0 h-0.5 w-64 bg-slate-300 left-1/2 -translate-x-1/2"></div>
        </div>

        {/* Layer 3: Hardware APIs */}
        <div className="flex justify-center gap-24">
          <div className="flex flex-col items-center relative">
             <div className="absolute -top-8 h-8 w-0.5 bg-slate-300"></div>
             <Node icon={Server} title="ZKTeco Cloud/SDK" sub="Biometric & Gates" color="slate" />
          </div>
          <div className="flex flex-col items-center relative">
             <div className="absolute -top-8 h-8 w-0.5 bg-slate-300"></div>
             <Node icon={Lock} title="TTLock Cloud API" sub="Smart Locks" color="sky" />
          </div>
        </div>

         {/* Layer 4: Database (Sidecar to Integration) */}
         {/* Visualized conceptually separate for clarity */}
         <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block">
             <Node icon={Database} title="PostgreSQL" sub="Users, Logs, Rules" color="rose" />
         </div>
      </div>
    </div>
  );
};