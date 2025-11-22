import React, { useState } from 'react';
import { MOCK_USER_BOOKINGS } from '../constants';
import { QrCode, KeyRound, Clock, Calendar, Lock, Unlock } from 'lucide-react';

export const UserBooking: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ACTIVE' | 'HISTORY'>('ACTIVE');

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Access</h1>
          <p className="text-slate-500 mt-1">Manage your bookings and entry credentials.</p>
        </div>
        <button className="mt-4 md:mt-0 bg-brand-600 hover:bg-brand-700 text-white px-6 py-2 rounded-lg font-medium shadow-sm transition-colors">
          + New Booking
        </button>
      </div>

      {/* Active Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_USER_BOOKINGS.map((booking) => (
          <div key={booking.id} className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden group hover:border-brand-200 transition-colors">
            {/* Card Header */}
            <div className="bg-slate-900 p-4 flex justify-between items-center">
              <h3 className="font-bold text-white flex items-center gap-2">
                {booking.resourceName}
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded border border-emerald-500/30">
                {booking.status}
              </span>
            </div>

            {/* QR / PIN Area */}
            <div className="p-6 flex flex-col items-center justify-center border-b border-slate-100 bg-slate-50">
              {booking.accessCode ? (
                <div className="text-center w-full">
                  <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">Entry PIN Code</p>
                  <div className="flex justify-center gap-2 mb-4">
                     {booking.accessCode.split('').map((digit, i) => (
                       <div key={i} className="w-10 h-12 bg-white border-2 border-slate-200 rounded flex items-center justify-center font-mono text-xl font-bold text-slate-800 shadow-sm">
                         {digit}
                       </div>
                     ))}
                  </div>
                  <p className="text-xs text-slate-400">Enter this code on the keypad.</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                   <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-200 mb-2">
                      <QrCode size={120} className="text-slate-800" />
                   </div>
                   <p className="text-xs text-slate-400">Scan at turnstile</p>
                </div>
              )}
            </div>

            {/* Actions & Details */}
            <div className="p-4">
              <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                 <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-brand-500" />
                    <span>{new Date(booking.startDate).toLocaleDateString()}</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <Clock size={14} className="text-brand-500" />
                    <span>{new Date(booking.startDate).getHours()}:00 - {new Date(booking.endDate).getHours()}:00</span>
                 </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center gap-2 py-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-sm font-medium text-slate-700 transition-colors">
                  <Lock size={14} /> Lock
                </button>
                <button className="flex items-center justify-center gap-2 py-2 bg-brand-50 border border-brand-100 hover:bg-brand-100 rounded-lg text-sm font-medium text-brand-700 transition-colors">
                  <Unlock size={14} /> Unlock
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};