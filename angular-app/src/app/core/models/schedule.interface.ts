import { Doctor } from './doctor.interface';

export interface Schedule {
  id: string;
  start_time: Date;
  end_time: Date;
  day_of_week: Number;
  doctor?: Doctor;
}
