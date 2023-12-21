import { Doctor } from './doctor.interface';

export interface MedicalSpecialty {
  id: string;
  name: string;
  description?: string;
  doctors?: Doctor[];
  state?: boolean;
}
