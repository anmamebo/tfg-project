import { Patient } from './patient.interface';
import { Doctor } from './doctor.interface';
import { Appointment } from './appointment.interface';

export interface StatusBadgeClasses {
  [status: string]: string;
}

export const STATUS_BADGE_CLASSES: StatusBadgeClasses = {
  in_progress: 'bg-warning',
  completed: 'bg-success',
  interrupted: 'bg-dark',
  cancelled: 'bg-danger',
};

export interface Treatment {
  id: string;
  status: string;
  description: string;
  duration: string;
  start_date: Date;
  patient: Patient;
  doctor: Doctor;
  appointment: Appointment;
  end_date?: Date;
  comments?: string;
  application_frequency?: string;
  recommended_dosage?: string;
}
