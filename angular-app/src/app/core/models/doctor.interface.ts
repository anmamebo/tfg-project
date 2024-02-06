import { Department } from './department.interface';
import { MedicalSpecialty } from './medical-specialty.interface';
import { User } from './user.interface';

export interface Doctor {
  id: string;
  collegiate_number: string;
  is_available: boolean;
  user: User;
  medical_specialties?: MedicalSpecialty[];
  departments?: Department[];
  state?: boolean;
}
