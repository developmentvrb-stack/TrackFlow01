
export type TripStatus = 'IN_PROGRESS' | 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED';
export type UserRole = 'EMPLOYEE' | 'MANAGER';

export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
}

export interface User {
  id: string; // This will be the Emp ID
  name: string;
  email: string;
  mobile: string;
  password?: string;
  role: UserRole;
  assignedManagerId?: string;
}

export interface Trip {
  id: string;
  employeeId: string;
  employeeName: string;
  managerId: string;
  startTime: string;
  endTime?: string;
  startLocation: Location;
  endLocation?: Location;
  startOdometerReading: number;
  endOdometerReading?: number;
  startOdometerImageUrl?: string;
  endOdometerImageUrl?: string;
  destinationName?: string;
  status: TripStatus;
  distanceKm?: number;
  deductionKm?: number;
  finalApprovedDistance?: number;
  notes?: string;
  managerNotes?: string;
  createdAt: string;
}
