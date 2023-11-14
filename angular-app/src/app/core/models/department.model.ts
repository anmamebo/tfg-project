import { Doctor } from "./doctor.model";

export class Department {
  constructor(
    public id: string,
    public name: string,
    public description?: string,
    public doctors?: Doctor[],
  ) {}
}