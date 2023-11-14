import { User } from "./user.model";
import { MedicalSpecialty } from "./medical-specialty.model";
import { Department } from "./department.model";

export class Doctor {
  constructor(
    public id: string,
    public collegiate_number: string,
    public is_available: boolean,
    public user?: User,
    public medical_specialties?: MedicalSpecialty[],
    public departments?: Department[],
  ) {}
}