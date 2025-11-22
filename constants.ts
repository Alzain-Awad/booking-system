import { Device, DeviceType, AccessLog, TableSchema, Booking, AccessStatus } from './types';

export const MOCK_DEVICES: Device[] = [
  { id: 'dev_1', name: 'Main Gate Turnstile', type: DeviceType.ZKTECO, location: 'Main Entrance', status: 'ONLINE', lastSync: '2 mins ago' },
  { id: 'dev_2', name: 'Office 301 Smart Lock', type: DeviceType.TTLOCK, location: '3rd Floor', status: 'ONLINE', batteryLevel: 85, lastSync: '5 mins ago' },
  { id: 'dev_3', name: 'Storage Area B', type: DeviceType.ZKTECO, location: 'Basement', status: 'OFFLINE', lastSync: '4 hours ago' },
  { id: 'dev_4', name: 'Meeting Room A', type: DeviceType.TTLOCK, location: '1st Floor', status: 'ONLINE', batteryLevel: 42, lastSync: '10 mins ago' },
];

export const MOCK_LOGS: AccessLog[] = [
  { id: 'log_1', timestamp: '2023-10-27T10:30:00', userName: 'Alice Johnson', device: 'Main Gate Turnstile', deviceType: DeviceType.ZKTECO, action: 'ENTRY_GRANTED', details: 'QR Code Scan' },
  { id: 'log_2', timestamp: '2023-10-27T10:35:00', userName: 'Bob Smith', device: 'Office 301 Smart Lock', deviceType: DeviceType.TTLOCK, action: 'ENTRY_GRANTED', details: 'Bluetooth Unlock' },
  { id: 'log_3', timestamp: '2023-10-27T11:00:00', userName: 'System', device: 'Storage Area B', deviceType: DeviceType.ZKTECO, action: 'SYNC_FAILURE', details: 'Device Timeout' },
  { id: 'log_4', timestamp: '2023-10-27T11:15:00', userName: 'Alice Johnson', device: 'Meeting Room A', deviceType: DeviceType.TTLOCK, action: 'ENTRY_DENIED', details: 'Booking Expired' },
];

export const DB_SCHEMA: TableSchema[] = [
  {
    name: 'Users',
    description: 'Core user identity and authentication info.',
    columns: [
      { name: 'id', type: 'UUID', pk: true },
      { name: 'email', type: 'VARCHAR(255)', note: 'Unique' },
      { name: 'password_hash', type: 'VARCHAR' },
      { name: 'full_name', type: 'VARCHAR' },
      { name: 'biometric_hash', type: 'TEXT', note: 'Stored for ZKTeco sync' }
    ]
  },
  {
    name: 'Devices',
    description: 'Hardware registry for ZKTeco and TTLocks.',
    columns: [
      { name: 'id', type: 'UUID', pk: true },
      { name: 'vendor_id', type: 'VARCHAR', note: 'Serial No from Device' },
      { name: 'type', type: 'ENUM', note: 'ZKTECO | TTLOCK' },
      { name: 'ip_address', type: 'VARCHAR', note: 'For ZKTeco' },
      { name: 'gateway_id', type: 'VARCHAR', note: 'For TTLock Gateway' }
    ]
  },
  {
    name: 'Bookings',
    description: 'Resource reservations that trigger access.',
    columns: [
      { name: 'id', type: 'UUID', pk: true },
      { name: 'user_id', type: 'UUID', fk: 'Users.id' },
      { name: 'resource_id', type: 'UUID' },
      { name: 'start_time', type: 'TIMESTAMP' },
      { name: 'end_time', type: 'TIMESTAMP' },
      { name: 'status', type: 'ENUM' }
    ]
  },
  {
    name: 'AccessRules',
    description: 'Linking bookings to specific device permissions.',
    columns: [
      { name: 'id', type: 'UUID', pk: true },
      { name: 'booking_id', type: 'UUID', fk: 'Bookings.id' },
      { name: 'device_id', type: 'UUID', fk: 'Devices.id' },
      { name: 'credential_data', type: 'JSONB', note: 'PIN, QR hash, or eKey ID' },
      { name: 'is_synced', type: 'BOOLEAN' }
    ]
  }
];

export const MOCK_USER_BOOKINGS: Booking[] = [
  {
    id: 'bk_1',
    resourceName: 'Office 301',
    resourceType: 'OFFICE',
    startDate: '2023-10-27T09:00:00',
    endDate: '2023-10-27T18:00:00',
    status: AccessStatus.ACTIVE,
    accessCode: '884291',
    qrCodeData: 'ACCESS_TOKEN_AES_ENCRYPTED_123'
  },
  {
    id: 'bk_2',
    resourceName: 'Main Parking - Spot 42',
    resourceType: 'PARKING',
    startDate: '2023-10-28T08:00:00',
    endDate: '2023-10-28T20:00:00',
    status: AccessStatus.PENDING
  }
];