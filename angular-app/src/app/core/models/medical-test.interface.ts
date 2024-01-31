import { Appointment } from './appointment.interface';
import { Doctor } from './doctor.interface';
import { Patient } from './patient.interface';

export interface MedicalTestAttachment {
  id: string;
  name?: string;
  description?: string;
  file: string;
  extension?: string;
  medical_test?: string | MedicalTest;
}

export interface MedicalTest {
  id: string;
  name: string;
  description?: string;
  date_prescribed: Date;
  result?: string;
  is_completed: boolean;
  doctor: Doctor;
  patient: Patient;
  appointment?: Appointment;
  attachments?: MedicalTestAttachment[];
}
