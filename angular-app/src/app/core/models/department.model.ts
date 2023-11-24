import { Doctor } from "./doctor.model";
import { Room } from "./room.model";

export class Department {
  constructor(
    public id: string,
    public name: string,
    public description?: string,
    public doctor_set?: Doctor[],
    public room_set?: Room[],
  ) {}
}