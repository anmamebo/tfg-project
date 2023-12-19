import { Doctor } from './doctor.interface';
import { Room } from './room.interface';

export interface Department {
  id: string;
  name: string;
  description?: string;
  doctor_set?: Doctor[];
  room_set?: Room[];
  state?: boolean;
}
