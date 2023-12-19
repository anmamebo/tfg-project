import { Patient } from './patient.interface';
import { Room } from './room.interface';
import { Doctor } from './doctor.interface';
import { MedicalSpecialty } from './medical-specialty.interface';
import { Schedule } from './schedule.interface';

export interface StatusBadgeClasses {
  [status: string]: string;
}

export const STATUS_BADGE_CLASSES: StatusBadgeClasses = {
  pending: 'bg-secondary',
  scheduled: 'bg-info',
  in_progress: 'bg-warning',
  completed: 'bg-success',
  rescheduled: 'bg-primary',
  no_show: 'bg-dark',
  cancelled: 'bg-danger',
};

export interface Appointment {
  id: string;
  status: string;
  type: string;
  request_date: Date;
  patient: Patient;
  specialty: MedicalSpecialty;
  reason?: string;
  observations?: string;
  estimated_duration?: number;
  actual_duration?: number;
  time_patient_arrived?: Date;
  end_time?: Date;
  priority?: number;
  room?: Room;
  doctor?: Doctor;
  schedule?: Schedule;
}
