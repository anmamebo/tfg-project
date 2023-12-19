import { Doctor } from './doctor.interface';
import { Patient } from './patient.interface';

export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  name: string;
  last_name: string;
  is_staff: boolean;
  is_active: boolean;
  profile_picture?: string;
  patient?: Patient;
  doctor?: Doctor;
}
