export enum AccessStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  EXPIRED = 'EXPIRED',
  REVOKED = 'REVOKED',
  SYNC_ERROR = 'SYNC_ERROR'
}

export enum DeviceType {
  ZKTECO = 'ZKTECO',
  TTLOCK = 'TTLOCK'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
}

export interface Booking {
  id: string;
  resourceName: string;
  resourceType: 'OFFICE' | 'MEETING_ROOM' | 'PARKING' | 'STORAGE';
  startDate: string;
  endDate: string;
  status: AccessStatus;
  accessCode?: string; // PIN or eKey ID
  qrCodeData?: string;
}

export interface AccessLog {
  id: string;
  timestamp: string;
  userName: string;
  device: string;
  deviceType: DeviceType;
  action: 'ENTRY_GRANTED' | 'ENTRY_DENIED' | 'EXIT' | 'SYNC_SUCCESS' | 'SYNC_FAILURE';
  details: string;
}

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  location: string;
  status: 'ONLINE' | 'OFFLINE' | 'MAINTENANCE';
  batteryLevel?: number; // For TTLock
  lastSync: string;
}

export interface TableSchema {
  name: string;
  description: string;
  columns: { name: string; type: string; pk?: boolean; fk?: string; note?: string }[];
}