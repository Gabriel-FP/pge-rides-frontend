export enum UserRole {
  CLIENT = 'client',
  DRIVER = 'driver'
}

export interface AuthSession {
  userId: number;
  role: UserRole;
  username: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export enum RideStatus {
  WAITING = 'WAITING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface Ride {
  id: number;
  userId: number;
  origin: string;
  destination: string;
  status: RideStatus;
  driverId: number | null;
  createdAt: string;
}

export interface ApiError {
  timestamp: string;
  status: number;
  message: string;
  fieldErrors: Record<string, string> | null;
}
