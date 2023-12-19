import { Department } from './department.interface';

export interface Room {
  id: string;
  name: string;
  location: string;
  is_available: boolean;
  description?: string;
  type?: string;
  capacity?: number;
  department?: Department;
  state?: boolean;
}
