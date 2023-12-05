import { Patient } from "./patient.model";
import { Doctor } from "./doctor.model";
import { Appointment } from "./appointment.model";

export interface StatusBadgeClasses {
  [status: string]: string;
}

export const STATUS_BADGE_CLASSES: StatusBadgeClasses = {
  in_progress: 'bg-warning',
  completed: 'bg-success',
  interrupted: 'bg-dark',
  cancelled: 'bg-danger',
};

export class Treatment {
  constructor(
    public id: string,
    public status: string,
    public description: string,
    public duration : string,
    public start_date: Date,
    public end_date?: Date,
    public comments?: string,
    public application_frequency?: string,
    public recommended_dosage?: string,
    public patient?: Patient,
    public doctor?: Doctor,
    public appointment?: Appointment,
  ) {}
}