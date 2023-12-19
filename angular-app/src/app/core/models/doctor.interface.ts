import { User } from './user.interface';
import { MedicalSpecialty } from './medical-specialty.interface';
import { Department } from './department.interface';

export interface Doctor {
  id: string;
  collegiate_number: string;
  is_available: boolean;
  user: User;
  medical_specialties?: MedicalSpecialty[];
  departments?: Department[];
  state?: boolean;
}
