import { Department } from './department.interface';
import { Doctor } from './doctor.interface';

export interface MedicalSpecialty {
  id: string;
  name: string;
  description?: string;
  department?: Department;
  doctors?: Doctor[];
  state?: boolean;
}
