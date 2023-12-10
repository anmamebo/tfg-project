import { Patient } from './patient.model';
import { Room } from './room.model';
import { Doctor } from './doctor.model';
import { MedicalSpecialty } from './medical-specialty.model';
import { Schedule } from './schedule.model';

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

export class Appointment {
  constructor(
    public id: string,
    public status: string,
    public type: string,
    public request_date: Date,
    public patient: Patient,
    public specialty: MedicalSpecialty,
    public reason?: string,
    public observations?: string,
    public estimated_duration?: number,
    public actual_duration?: number,
    public time_patient_arrived?: Date,
    public end_time?: Date,
    public priority?: number,
    public room?: Room,
    public doctor?: Doctor,
    public schedule?: Schedule
  ) {}
}
