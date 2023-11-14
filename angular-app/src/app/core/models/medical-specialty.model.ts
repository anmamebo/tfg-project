import { Doctor } from "./doctor.model";

export class MedicalSpecialty {
  constructor(
    public id: string,
    public name: string,
    public description?: string,
    public doctors?: Doctor[],
  ) {}
}